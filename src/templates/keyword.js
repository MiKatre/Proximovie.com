import React from "react"

import { graphql } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Keywords = ({ pageContext, data }) => {
  const { keyword } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const budget = data.budget.edges
  const keywordHeader = `Movies about: ${keyword}`

  const title = `${keyword} movies and similar`
  const description = `Browse recent and popular ${keyword} movies such as ${recent[0].node.title}.`
  return (
      <Layout>
        <Seo 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">{keywordHeader}</h1>

            {/* <h2 className="fw-bolder text-center pt-5">Recent {keyword} Movies </h2>
            <p className="text-center">Last released {keyword.toLowerCase()} movies </p>
            <div>
                <MovieList movies={recent} />
            </div>

            <h2 className="fw-bolder text-center pt-5">Popular {keyword} Movies </h2>
            <p className="text-center">The most popular {keyword.toLowerCase()} movies </p> */}
            <div>
                <MovieList movies={budget} />
            </div>
        </div>
      </Layout>
  )
}

export default Keywords
export const pageQuery = graphql`
  query($keyword: String) {
    recent: allMoviesJson(
        sort: { fields: release_date, order: DESC}
        filter: { keywords: { in: [$keyword] } } 
        limit: 20
    ) {
      totalCount
      edges {
        node {
            id
            title
            slug
            release_date(formatString: "MMMM D, YYYY")
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

    budget: allMoviesJson(
        sort: { fields: budget, order: DESC}
        filter: { keywords: { in: [$keyword] } } 
        limit: 200
    ) {
      edges {
        node {
            id
            title
            slug
            release_date(formatString: "MMMM D, YYYY")
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