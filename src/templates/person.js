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

           { recent.length &&
            <>
              <h2 className="fw-bolder text-center pt-5">Recent {person} Movies </h2>
              <p className="text-center">Last released {person.toLowerCase()} movies </p>
              <div>
                  <MovieList movies={recent} width={150} minHeight={250}/>
              </div>
            </> || ""
            }


            { budget.length &&
            <>
              <h2 className="fw-bolder text-center pt-5">Popular Movies with {person} </h2>
              <p className="text-center">The most popular {person.toLowerCase()} movies </p>
              <div>
                  <MovieList movies={budget} />
              </div>
            </> || ""
            } 
            { budgetCrew.length &&
              <div>
                <h2 className="fw-bolder text-center pt-5">With {person} as a crew member </h2>
                <p className="text-center">Producter, director, writer, etc. </p>
                <MovieList movies={budgetCrew} width={150} minHeight={250}/>
              </div>
            } 
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