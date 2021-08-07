import React from "react"
import PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Genres = ({ pageContext, data }) => {
  const { genre } = pageContext
  const { edges, totalCount } = data.recent
  const recent = data.recent.edges
  const budget = data.budget.edges
  const genreHeader = `${genre} movie${
    totalCount === 1 ? "" : "s"
  }`

  const title = `${genre} movies and similar`
  const description = `Browse recent and popular ${genre} movies such as ${recent[0].node.title}, ${recent[1].node.title}, ${recent[2].node.title}, ${recent[3].node.title}.`
  return (
      <Layout>
        <SEO 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">{genreHeader}</h1>

            <h2 className="fw-bolder text-center pt-5">Recent {genre} Movies </h2>
            <p className="text-center">Last released {genre.toLowerCase()} movies </p>
            <ul>
                <MovieList movies={recent} />
            </ul>

            <h2 className="fw-bolder text-center pt-5">Popular {genre} Movies </h2>
            <p className="text-center">The most popular {genre.toLowerCase()} movies </p>
            <ul>
                <MovieList movies={budget} />
            </ul>
        </div>
      </Layout>
  )
}

export default Genres
export const pageQuery = graphql`
  query($genre: String) {
    recent: allMoviesJson(
        sort: { fields: release_date, order: DESC}
        filter: { genres: { in: [$genre] } } 
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
        filter: { genres: { in: [$genre] } } 
        limit: 20
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