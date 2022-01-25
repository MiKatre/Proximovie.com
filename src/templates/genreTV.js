import React from "react"

import { graphql, Link } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Button } from "react-bootstrap"
import { slugify } from "../utils/main"

const GenresTV = ({ pageContext, data }) => {
  const { genre } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const popular = data.popular.edges
  const genreHeader = `${genre} TV Show${
    totalCount === 1 ? "" : "s"
  }`

  let tvOnlyGenres = ["politics","soap","kids","reality"]

  if (recent && !recent.length) {
    return (
      <Layout>
        <h1 className=" bg-dark text-white fw-bolder text-center p-4">
          {genreHeader}
          <br/>
          { !tvOnlyGenres.includes(slugify(genre)) &&
            <>
                <Link to={`/genre/${slugify(genre)}/`}>
                    <Button className="mx-1" variant="outline-light" outline size="sm">Movies</Button> 
                </Link>
                <Button className="mx-1" variant="light" size="sm">TV Shows</Button> 
            </>
          }
        </h1>
        <p className="text-center">No TV Shows with this genre </p>
      </Layout>
    )
  }

  const title = `${genre} TV Shows and similar`
  const description = `Browse recent and popular ${genre} TV Shows such as ${recent[0].node.title}, ${recent[1].node.title}, ${popular[0].node.title}, ${popular[1].node.title}.`
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
                { !tvOnlyGenres.includes(slugify(genre)) &&
                <>
                    <Link to={`/genre/${slugify(genre)}/`}>
                        <Button className="mx-1" variant="outline-light" outline size="sm">Movies</Button> 
                    </Link>
                    <Button className="mx-1" variant="light" size="sm">TV Shows</Button> 
                </>
                }
                
            </h1>
            <p className="text-center">Recent {genre.toLowerCase()} TV Shows </p>
            <div>
                <MovieList movies={recent} isTvShow={true} scroll width={250} />
            </div>

            <h2 className="fw-bolder text-center pt-5">Popular {genre} TV Shows </h2>
            <p className="text-center">The most popular {genre.toLowerCase()} TV Shows </p>
            <div>
                <MovieList movies={popular} isTvShow={true} scroll width={250} />
            </div>
        </div>
      </Layout>
  )
}

export default GenresTV

export const GenresTVQuery = graphql`
  query($genre: String) {
    recent: allShowsJson(
        sort: { fields: first_air_date, order: DESC}
        filter: { genres: { in: [$genre] } } 
        limit: 5
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
                    height:450
                    width: 300
                    placeholder: TRACED_SVG
                  )
                }
            }
        }
      }
    }

    popular: allShowsJson(
        sort: { fields: popularity, order: DESC}
        filter: { genres: { in: [$genre] } } 
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
                    height:450
                    width: 300
                    placeholder: TRACED_SVG
                  )
                }
            }
        }
      }
    }
  }
`