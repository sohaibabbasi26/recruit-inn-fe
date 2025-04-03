import styles from "./AdminTopNavbar.module.css";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

const AdminTopNavbar = ({
  reportOverlay,
  setReportOverlay,
  setMessage,
  showSuccess,
  selectedCandidate,
  setSelectedCandidate,
}) => {
  const searchLogoSize = 20;
  const iconSize = 15;
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("Candidates");
  const [searchResults, setSearchResults] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [results, setResults] = useState(false);

  const handleClickOutside = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target) &&
      !searchInputRef.current.contains(event.target)
    ) {
      setSearchResults(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchApiCall = debounce(async (query, type) => {
    setSearchResults(null);
    if (!query) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/client-search?query=${query}&type=${type}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // ("search API:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  }, 300);

  useEffect(() => {
    if (query.trim()) {
      searchApiCall(query, searchType);
    } else if (isClicked) {
      setSearchResults(query, searchType);
    } else {
      setSearchResults(query, searchType);
    }
    return () => searchApiCall.cancel();
  }, [query, searchType, isClicked]);

  useEffect(() => {
    if (query.trim()) {
      //("is clicked:", isClicked);
      searchApiCall(query, searchType);
      if (isClicked) {
        setSearchResults(query, searchType);
      }
    }
    return () => searchApiCall.cancel();
  }, [isClicked]);

  const focusSearchInput = () => {
    //("Search field clicked!");
    setIsClicked(true);
    if (searchInputRef.current) searchInputRef.current.focus();

    if (query && !searchResults) {
      searchApiCall(query, searchType);
    }
  };

  const [randomKey, setRandomKey] = useState(uuidv4());

  const demolink = `http://localhost:3000/invited-candidate/${randomKey}`;

  function copyToClipboard(text) {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textarea);
      return result;
    }
  }

  function handleButtonClick() {
    setRandomKey(uuidv4());
    copyToClipboard(demolink);
    setMessage("Your link has been copied");
    showSuccess();
  }

  const cardClickHandler = async (candidate) => {
    // Fetch full candidate details including results
    const requestBody = { candidate_id: candidate.candidate_id };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },


        
        body: JSON.stringify(requestBody),
      }
    );
    const fullCandidateData = await response.json();
    //("///////////////////////////", fullCandidateData);

    // Set the fetched candidate data as the selected candidate
    setSelectedCandidate({
      ...candidate,
      results: fullCandidateData?.data?.result,
    });
    //("HIIII FROM SEARCH");
    setReportOverlay(!reportOverlay);
  };
  useEffect(() => {
    // let isMounted = true;
    // //('client_id:', id)
    // localStorage.setItem('clientId', id);
    // const token = localStorage.getItem('client-token');
    // setToken(token)
    async function fetchAllCandidateReports() {
      const requestBody = {
        candidate_id: selectedCandidate?.candidate_id,
      };
      //   setIsLoading(true)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //   'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestBody),
        }
      );

      //("response: ", response);
      if (!response.ok) {
        //(`Error: ${response.status}`);
      }
      const allData = await response.json();
      //   if (isMounted) {
      // setAllCandidateReports(allData);
      setResults(allData);
      // setIsLoading(false);
      //   }
      //("jsonified candidates response: ", allData);
    }
    fetchAllCandidateReports();
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
    <>
      <div className={styles.masterContainer}>
        <div className={styles.searchBar}>
          <div className={styles.container}>
            <div className={styles.searchInput}>
              <Image
                src="/Search.svg"
                height={searchLogoSize}
                width={searchLogoSize}
                onClick={focusSearchInput}
                alt="Search"
                style={{ cursor: "pointer" }}
              />
              <input
                onClick={() => {
                  searchApiCall(query, searchType);
                }}
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className={styles.selectCategory}>
              <select>
                <option value="Candidates">Candidates</option>
                <option value="Clients">Clients</option>
              </select>
            </div>
          </div>
        </div>
     
          {searchResults && searchResults?.data?.data ? (
          searchResults.data.data.length > 0 ? (
            <div className={styles.searchResults} ref={searchResultsRef}>
              <ul>
                {searchResults.data.data.map((result) => (
                  <li
                    key={result?.position_id || result?.candidate_id}
                    onClick={() => {
                      searchType === "client"
                        ? onJobSelect(result)
                        : searchType === "Candidates"
                        ? cardClickHandler(result)
                        : null;
                      setSearchResults(null);
                    }}
                  >
                    {searchType === "client" ? result?.position : result?.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.searchResults} ref={searchResultsRef}>
              <p>No {searchType === "client" ? "client" : "candidates"} found.</p>
            </div>
          )
        ) : null}
      
{/* 
        <button onClick={handleButtonClick}>Invite A Candidate</button> */}
      </div>
    </>
  );
};

export default AdminTopNavbar;
