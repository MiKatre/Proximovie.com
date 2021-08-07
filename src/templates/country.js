import React from "react"

import { graphql } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Country = ({ pageContext, data }) => {
  const { country } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const budget = data.budget.edges
  const countryHeader = `Movie${
    totalCount === 1 ? "" : "s"
  } made in ${country}`

  const title = `Movies made in ${country} and similar`
  const description = `Browse recent and popular ${country} movies such as ${recent[0].node.title}, ${recent[1].node.title}, ${budget[0].node.title}, ${budget[1].node.title}.`
  return (
      <Layout>
        <SEO 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">{countryHeader}</h1>

            <h2 className="fw-bolder text-center pt-5">Recent Movies made in {country}  </h2>
            <p className="text-center">Last released movies produced in {country.toLowerCase()} </p>
            <ul>
                <MovieList movies={recent} />
            </ul>

            <h2 className="fw-bolder text-center pt-5">Popular Movies made in {country} </h2>
            <p className="text-center">The most popular movies produced in {country.toLowerCase()} </p>
            <ul>
                <MovieList movies={budget} />
            </ul>
        </div>
      </Layout>
  )
}

export default Country
export const pageQuery = graphql`
  query($country: String) {
    recent: allMoviesJson(
        sort: { fields: release_date, order: DESC}
        filter: { production_countries: { in: [$country] } } 
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
        filter: { production_countries: { in: [$country] } } 
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