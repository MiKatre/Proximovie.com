import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { Formik, Form, Field } from 'formik'
import {  graphql, Link, StaticQuery } from "gatsby"
import { Dropdown } from 'react-bootstrap'

const SearchBar = ({data}) => {
    const index = data.localSearchMovies.index
    const store = data.localSearchMovies.store

    const [query, setQuery] = useState(null)
    const results = useFlexSearch(query, index, store)

    return (
        <div>
            <Dropdown>
            <input 
                size="sm" 
                className="form-control mr-sm-2" 
                value={query} 
                aria-label="Search" 
                placeholder="Search" 
                onChange={(e) => setQuery(e.target.value)} 
            />

            <Dropdown.Menu show={results.length}>
                {results.map(result => (
                    <Dropdown.Item key={result.id}>
                        <Link to={`/movie/${result.slug}`} className="text-dark text-decoration-none">
                            {result.title}
                        </Link>
                    </Dropdown.Item>
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
            }
          }
        `}
        render={data => <SearchBar data={data} {...props} />}
      />
    )
  }