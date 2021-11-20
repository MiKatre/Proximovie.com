import React, { useEffect, useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { Formik, Form, Field } from 'formik'
import {  graphql, Link, StaticQuery } from "gatsby"
import { Dropdown } from 'react-bootstrap'

const SearchBar = ({data}) => {
    // const index = data.localSearchMovies.index
    // const store = data.localSearchMovies.store
    // const [query, setQuery] = useState(null)
    const [index, setIndex] = useState(null)
    const [store, setStore] = useState(null)

    // const entireIndex = data.localSearchMovies.index
    // const entireStore = data.localSearchMovies.store

    const indexURL = data.localSearchMovies.publicIndexURL
    const storeURL = data.localSearchMovies.publicStoreURL

    async function fetchIndex() {
      const response = await fetch(indexURL)
      const result = await response.text()
      setIndex(result)
      // localStorage.setItem("localSearchMoviesIndex",result)
      // console.log("fetched index "+result)
      // console.log("entire index "+entireIndex)
    }
    async function fetchStore() {
      const response = await fetch(storeURL)
      const result = await response.json()
      setStore(result)
    }
    // async function fetchStore() {
    //   let result = await localStorage.getItem("localSearchMoviesStore")
    //   if (result === null) {
    //     const response = await fetch(storeURL)
    //     result = await response.json()
    //     localStorage.setItem("localSearchMoviesStore",result)
    //   }
    //   setStore(result)
    // }

    useEffect(() => {
      fetchIndex();
      fetchStore();
    },[])

    if (index && store) return <LoadedSearchBar index={index} store={store} />

    let results = []

    return (
        <div>
            <Dropdown>
            <input 
                size="sm" 
                className="form-control mr-sm-2" 
                // value={query} 
                aria-label="Search" 
                placeholder="Search" 
            />

            <Dropdown.Menu show={results.length} align="end">
                {results.map(result => (
                  <Link to={`/movie/${result.slug}`} className="text-dark text-decoration-none">
                    <Dropdown.Item as="button" key={result.id}>
                      {result.title}
                    </Dropdown.Item>
                  </Link>
                ))}
            </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

const LoadedSearchBar = ({index, store}) => {
  const [query, setQuery] = useState(null)
  let results = useFlexSearch({query: query, suggest: false, limit: 10}, index, store)

  return (
    <div>
        <Dropdown>
        <input 
            size="sm" 
            className="form-control mr-sm-2" 
            // value={query} 
            aria-label="Search" 
            placeholder="Search" 
            
            onChange={(e) => {e.target.value && e.target.value.length > 2 ? setQuery(e.target.value) : setQuery(null)}} 
        />

        <Dropdown.Menu show={results.length} align="end">
            {results.map(result => (
              <Link to={`/movie/${result.slug}`} className="text-dark text-decoration-none">
                <Dropdown.Item as="button" key={result.id}>
                  {result.title}
                </Dropdown.Item>
              </Link>
            ))}
        </Dropdown.Menu>
        </Dropdown>
    </div>
)
}


export default function Search(props) {
    return (
      <StaticQuery
        query={graphql`
        query {
            localSearchMovies {
              index
              store
              publicIndexURL
              publicStoreURL
            }
          }
        `}
        render={data => <SearchBar data={data} {...props} />}
      />
    )
  }