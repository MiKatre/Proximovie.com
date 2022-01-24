import React from "react"

import { graphql, Link } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Button } from "react-bootstrap"

const Genres = ({ pageContext, data }) => {
  const { genre } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const budget = data.budget.edges
  const genreHeader = `${genre} Movie${
    totalCount === 1 ? "" : "s"
  }`

  const title = `${genre} movies and similar`
  const description = `Browse recent and popular ${genre} movies such as ${recent[0].node.title}, ${recent[1].node.title}, ${budget[0].node.title}, ${budget[1].node.title}.`
  return (
      <Layout>
        <Seo 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">
              {genreHeader}
              <br/>
              <Button className="mx-1" variant="light" outline size="sm">Movies</Button> 
              <Link to="tv">
                <Button className="mx-1" variant="outline-light" size="sm">TV Shows</Button> 
              </Link>
            </h1>
            <p className="text-center">Recent {genre.toLowerCase()} movies </p>
            <div>
                <MovieList movies={recent} width={150} minHeight={250}/>
            </div>

            <h2 className="fw-bolder text-center pt-5">Popular {genre} Movies </h2>
            <p className="text-center">The most popular {genre.toLowerCase()} movies </p>
            <div>
                <MovieList movies={budget} />
            </div>
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
        limit: 5
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
                    width: 150
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