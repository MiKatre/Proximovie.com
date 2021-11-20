import React, { useEffect, useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { Formik, Form, Field } from 'formik'
import {  graphql, Link, StaticQuery } from "gatsby"
import { Dropdown } from 'react-bootstrap'

const SearchBar = ({data}) => {
    const [index, setIndex] = useState(null)
    const [store, setStore] = useState(null)

    const indexURL = data.localSearchMovies.publicIndexURL
    const storeURL = data.localSearchMovies.publicStoreURL

    async function fetchIndex() {
      const response = await fetch(indexURL)
      const result = await response.text()
      setIndex(result)
    }
    async function fetchStore() {
      const response = await fetch(storeURL)
      const result = await response.json()
      setStore(result)
    }


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
    <div className="w-100">
        <Dropdown className="">
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
              publicIndexURL
              publicStoreURL
            }
          }
        `}
        render={data => <SearchBar data={data} {...props} />}
      />
    )
  }