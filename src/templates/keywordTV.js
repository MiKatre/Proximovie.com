import React from "react"

import { graphql, Link } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Button } from "react-bootstrap"
import { slugify } from "../utils/main"

const KeywordsTV = ({ pageContext, data }) => {
  const { keyword } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const popular = data.popular.edges
  const keywordHeader = `TV Shows about: ${keyword}`

  const title = `${keyword} TV Shows and similar`
  const description = `Browse recent and popular ${keyword} TV Shows such as ${recent[0].node.title}.`
  return (
      <Layout>
        <Seo 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">
                {keywordHeader}
                <br/>
                <Link to={`/keyword/${slugify(keyword)}/`}>
                    <Button className="mx-1" variant="outline-light" outline size="sm">Movies</Button> 
                </Link>
                <Button className="mx-1" variant="light" size="sm">TV Shows</Button> 
            </h1>

            {/* <h2 className="fw-bolder text-center pt-5">Recent {keyword} Movies </h2>
            <p className="text-center">Last released {keyword.toLowerCase()} movies </p>
            <div>
                <MovieList movies={recent} />
            </div>

            <h2 className="fw-bolder text-center pt-5">Popular {keyword} Movies </h2>
            <p className="text-center">The most popular {keyword.toLowerCase()} movies </p> */}
            <div>
                <MovieList movies={popular} isTvShow={true} />
            </div>
        </div>
      </Layout>
  )
}

export default KeywordsTV
export const pageQuery = graphql`
  query($keyword: String) {
    recent: allShowsJson(
        sort: { fields: first_air_date, order: DESC}
        filter: { keywords: { in: [$keyword] } } 
        limit: 20
    ) {
      totalCount
      edges {
        node {
            id
            title
            slug
            first_air_date(formatString: "MMMM D, YYYY")
            gatsby_image_path {
                childImageSharp {
                  gatsbyImageData(
                    width: 300
                    placeholder: BLURRED
                  )
                }
            }
        }
      }
    }

    popular: allShowsJson(
        sort: { fields: popularity, order: DESC}
        filter: { keywords: { in: [$keyword] } } 
        limit: 200
    ) {
      edges {
        node {
            id
            title
            slug
            first_air_date(formatString: "MMMM D, YYYY")
            gatsby_image_path {
                childImageSharp {
                  gatsbyImageData(
                    width: 300
                    placeholder: BLURRED
                  )
                }
            }
        }
      }
    }
  }
`