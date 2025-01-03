import styles from "./AdminTopNavbar.module.css";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

const AdminTopNavbar = ({ setMessage, showSuccess }) => {
  const searchLogoSize = 20;
  const iconSize = 15;
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("Candidates");
  const [searchResults, setSearchResults] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const searchInputRef = useRef(null);

  const searchApiCall = debounce(async (query, type) => {
    setSearchResults(null);
    if (!query) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/client-search?query=${query}&type=${type}&companyId=${companyId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("search API:", data);
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
      console.log("is clicked:", isClicked);
      searchApiCall(query, searchType);
      if (isClicked) {
        setSearchResults(query, searchType);
      }
    }
    return () => searchApiCall.cancel();
  }, [isClicked]);

  const focusSearchInput = () => {
    console.log("Search field clicked!");
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
        {searchResults && searchResults?.data && searchResults?.data?.data && (
          <div className={styles.searchResults} ref={searchResultsRef}>
            <ul>
              {searchResults?.data?.data?.map((result) => (
                <li
                  key={result?.position_id}
                  onClick={() => {
                    console.log(
                      "fetched result for selected candidate:",
                      result
                    );
                    searchType === "Jobs"
                      ? onJobSelect(result)
                      : searchType === "Candidates"
                      ? cardClickHandler(result)
                      : "";
                    setSearchResults(null);
                  }}
                >
                  {searchType === "Jobs"
                    ? result?.position
                    : searchType === "Candidates"
                    ? result?.name
                    : ""}
                  {searchType === "Candidates" ? (
                    <span>
                      {" "}
                      Tech stack:{" "}
                      {result?.expertise
                        ?.map((expertise) => expertise?.skill)
                        .join(", ")}{" "}
                    </span>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={handleButtonClick}>Invite A Candidate</button>
      </div>
    </>
  );
};

export default AdminTopNavbar;
