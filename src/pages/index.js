import * as React from 'react'
import { graphql, Link } from 'gatsby' 
import Layout from '../components/Layout'
import MovieList from '../components/MovieList'
import { Container, Row } from 'react-bootstrap'
import Jumbotron from '../components/Jumbotron'

const IndexPage = ({data}) => {
  console.log(data)
  const recent = data.recent.edges
  const budget = data.budget.edges

  return (
    <Layout>
      <Jumbotron/>
      <Container  className="">
      <Row>
          <h1 id="popular_movies" className="fw-bolder text-center pt-5 pb-3">Most popular movies</h1>
          {/* <p className="text-center">Best movies like </p> */}
          <MovieList movies={budget}/>
        </Row>
        <Row>
          <h1 id="recent_movies"  className="fw-bolder text-center pt-4 pb-3">Recent Movies</h1>
          {/* <p className="text-center">Best movies like </p> */}
          <MovieList movies={recent}/>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    recent: allMoviesJson(sort: {fields: release_date, order: DESC}, limit: 30) {
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
    budget: allMoviesJson(sort: {fields: budget, order: DESC}, limit: 30) {
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