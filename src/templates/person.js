import React from "react"

import { graphql } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Person = ({ pageContext, data }) => {
  const { person } = pageContext
  const { totalCount } = data.recent
  
  const recent = data.recent.edges
  const recentCrew = data.recentCrew.edges
  const budget = data.budget.edges
  const budgetCrew = data.budgetCrew.edges

  const personHeader = `${person} movie${
    totalCount === 1 ? "" : "s"
  }`

  const title = `${person} movies and similar`
  let description = `Browse recent and popular movies and tv shows involving ${person}`
  try {
    description = `Browse recent and popular ${person} movies and TV Shows such as ${recent[0].node.title} ${budget[0].node.title}.`
} catch (err) {
    description = `Browse recent and popular ${person} movies and TV Shows such as ${recentCrew[0].node.title} ${budgetCrew[0].node.title}.`
  }

  return (
      <Layout>
        <Seo 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">{personHeader}</h1>

            <h2 className="fw-bolder text-center pt-5">Recent {person} Movies </h2>
            <p className="text-center">Last released {person.toLowerCase()} movies </p>
            <ul>
                <MovieList movies={recent} />
                <MovieList movies={recentCrew} />
            </ul>

            <h2 className="fw-bolder text-center pt-5">Popular {person} Movies </h2>
            <p className="text-center">The most popular {person.toLowerCase()} movies </p>
            <ul>
                <MovieList movies={budget} />
                <MovieList movies={budgetCrew} />
            </ul>
        </div>
      </Layout>
  )
}

export default Person
export const pageQuery = graphql`
  query($person: String) {
    recent: allMoviesJson(
        sort: { fields: release_date, order: DESC}
        filter: { cast: { in: [$person] } } 
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
    recentCrew: allMoviesJson(
        sort: { fields: release_date, order: DESC}
        filter: { crew: { in: [$person] } } 
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
        filter: { cast: { in: [$person] } } 
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

    budgetCrew: allMoviesJson(
        sort: { fields: budget, order: DESC}
        filter: { crew: { in: [$person] } } 
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

  }
`