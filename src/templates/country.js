import React from "react"

import { graphql } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Country = ({ pageContext, data }) => {
  const { country } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const budget = data.budget.edges
  const countryHeader = `Movie${
    totalCount === 1 ? "" : "s"
  } made in ${country}`

  const title = `Movies made in ${country} and similar`
  let description
  try {
    description = `Browse recent and popular movies made in ${country} such as ${recent[0].node.title}, ${recent[1].node.title}, ${budget[0].node.title}, ${budget[1].node.title}.`
  } catch (err) {
    description = `Browse recent and popular movies made in ${country} such as ${recent[0].node.title} and ${budget[0].node.title}.`
  }
  return (
      <Layout>
        <Seo 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">{countryHeader}</h1>

            <h2 className="fw-bolder text-center pt-5">Recent Movies made in {country}  </h2>
            <p className="text-center">Last released movies produced in {country.toLowerCase()} </p>
            <div>
                <MovieList movies={recent} />
            </div>

            <h2 className="fw-bolder text-center pt-5">Popular Movies made in {country} </h2>
            <p className="text-center">The most popular movies produced in {country.toLowerCase()} </p>
            <div>
                <MovieList movies={budget} />
            </div>
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