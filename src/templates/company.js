import React from "react"

import { graphql } from "gatsby"
import MovieList from "../components/MovieList"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Company = ({ pageContext, data }) => {
  const { company } = pageContext
  const { totalCount } = data.recent
  const recent = data.recent.edges
  const budget = data.budget.edges
  const companyHeader = `Movie${
    totalCount === 1 ? "" : "s"
  } made by ${company}`

  const title = `Movies made by ${company} and similar`
  let description
  try {
    description = `Browse recent and popular ${company} movies such as ${recent[0].node.title}, ${recent[1].node.title}, ${budget[0].node.title}, ${budget[1].node.title}.`
  } catch (err) {
    description = `Browse recent and popular ${company} movies such as ${recent[0].node.title} and ${budget[0].node.title}.`
  }
  return (
      <Layout>
        <Seo 
            title={title}
            description={description}
        />
        <div>
            <h1 className=" bg-dark text-white fw-bolder text-center p-4">{companyHeader}</h1>

            <h2 className="fw-bolder text-center pt-5">Recent Movies made by {company}  </h2>
            <p className="text-center">Last released movies produced by {company.toLowerCase()} </p>
            <div>
                <MovieList movies={recent} />
            </div>

            <h2 className="fw-bolder text-center pt-5">Popular Movies made by {company} </h2>
            <p className="text-center">The most popular movies produced by {company.toLowerCase()} </p>
            <div>
                <MovieList movies={budget} />
            </div>
        </div>
      </Layout>
  )
}

export default Company
export const pageQuery = graphql`
  query($company: String) {
    recent: allMoviesJson(
        sort: { fields: release_date, order: DESC}
        filter: { production_companies: { in: [$company] } } 
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
        filter: { production_companies: { in: [$company] } } 
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