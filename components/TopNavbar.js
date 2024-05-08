import { useState, useEffect, useRef } from 'react';
import styles from './TopNavbar.module.css';
import Image from 'next/image';
import debounce from 'lodash.debounce';
// import { isActionCreator } from '@reduxjs/toolkit';


const TopNavbar = ({ selectedCandidate, companyId, onJobSelect, reportOverlay, onCandidateSelect, setReportOverlay, setSelectedCandidate }) => {
    const searchLogoSize = 20;
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('Candidates');
    const [searchResults, setSearchResults] = useState(null);
    const searchResultsRef = useRef(null);
    const searchInputRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const [results, setResults] = useState(false);

    const searchApiCall = debounce(async (query, type) => {
        setSearchResults(null);
        if (!query) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/client-search?query=${query}&type=${type}&companyId=${companyId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('search API:', data);
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
            console.log('is clicked:', isClicked);
            searchApiCall(query, searchType);
            if (isClicked) {
                setSearchResults(query, searchType);
            }
        }
        return () => searchApiCall.cancel();
    }, [isClicked]);

    const handleClickOutside = (event) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target) && !searchInputRef.current.contains(event.target)) {
            setSearchResults(null);
        }
    }

    // const cardClickHandler = (candidate) => {
    //     setSelectedCandidate(candidate);
    //     setReportOverlay(!reportOverlay);
    // }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const focusSearchInput = () => {
        console.log("Search field clicked!")
        setIsClicked(true);
        if (searchInputRef.current) searchInputRef.current.focus();

        if (query && !searchResults) {
            searchApiCall(query, searchType);
        }
    }

    // setSelectedCandidate

    const cardClickHandler = (candidate) => {
        setSelectedCandidate(candidate);
        setReportOverlay(!reportOverlay);
    }

    // result-by-cand-id

    useEffect(() => {
        // let isMounted = true;
        // console.log('client_id:', id)
        // localStorage.setItem('clientId', id);
        // const token = localStorage.getItem('client-token');
        // setToken(token)
        async function fetchAllCandidateReports() {
            const requestBody = {
                candidate_id: selectedCandidate?.candidate_id
            };
            //   setIsLoading(true)

            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //   'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestBody),
                });

            console.log('response: ', response);
            if (!response.ok) {
                console.log(`Error: ${response.status}`);
            }
            const allData = await response.json();
            //   if (isMounted) {
            // setAllCandidateReports(allData);
            setResults(allData);
            // setIsLoading(false);
            //   }
            console.log('jsonified candidates response: ', allData);
        }
        fetchAllCandidateReports()
        // return () => {
        //   isMounted = false;
        // };
    }, []);

    //   const cardClickHandler = (candidate) => {
    //     setSelectedCandidate(candidate);
    //     setReportOverlay(!reportOverlay);
    // }


    return (
        <>
            <div className={styles.masterContainer}>
                <div className={styles.searchBar} style={{ outline: isClicked ? '2px solid #6137db' : '' }}>
                    <div className={styles.container}>
                        <div className={styles.searchInput}>
                            <Image src='/Search.svg' height={searchLogoSize} width={searchLogoSize} onClick={focusSearchInput} alt="Search" style={{ cursor: 'pointer' }} />
                            <input onClick={() => { searchApiCall(query, searchType) }}
                                // onBlur={blurSearchInput}
                                ref={searchInputRef}
                                type='text'
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className={styles.selectCategory}>
                            <select className={styles.searchOptions} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                <option className={styles.searchOptions} value='Candidates'>Candidates</option>
                                <option className={styles.searchOptions} value='Jobs'>Jobs</option>
                            </select>
                        </div>
                    </div>
                </div>
                {searchResults && searchResults?.data && searchResults?.data?.data && (
                    <div className={styles.searchResults} ref={searchResultsRef}>
                        <ul>
                            {searchResults?.data?.data?.map((result) => (
                                <li key={result?.position_id} onClick={() => {
                                    console.log("fetched result for selected candidate:", result);
                                    searchType === 'Jobs' ? onJobSelect(result) : searchType === 'Candidates' ? cardClickHandler(result) : '';
                                    setSearchResults(null);
                                }}>
                                    {
                                        searchType === 'Jobs' ? (result?.position) : searchType === 'Candidates' ? (result?.name) : ''
                                    }
                                    {searchType === 'Candidates' ?  (<span>  Tech stack: {result?.expertise?.map(expertise => expertise?.skill).join(', ')} </span>) : <></>}
                                </li>   
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default TopNavbar;
