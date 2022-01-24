import * as React from 'react'
import { graphql } from 'gatsby' 
import Layout from '../components/Layout'
import MovieList from '../components/MovieList'
import { Container, Row } from 'react-bootstrap'
import Jumbotron from '../components/Jumbotron'
import Seo from '../components/Seo'
import KeywordsSection from '../components/KeywordsSection'
import Search from '../components/Search'

const TVShowPage = ({data}) => {

  const recent = data.recent.edges
  // const budget = data.budget.edges
  const popular = data.popular.edges

  const keywords = data.keywords.group.sort((a,b) => a.totalCount < b.totalCount).slice(0,20)
  const genres = data.genres.group.sort((a,b) => a.totalCount < b.totalCount).slice(0,30)
  const cast = data.cast.group.sort((a,b) => a.totalCount < b.totalCount).slice(0,30)

  return (
    <Layout>
      <Seo/>
      <Jumbotron/>
      <Container fluid className="">
        <Row>
          <h5 id="popular_keywords" className="fw-bolder text-center pt-1 pt-md-2 pb-3">Popular keywords</h5>
          <KeywordsSection keywords={keywords}/>
        </Row>
        <Row>
          <h1 id="popular_movies" className="fw-bolder text-center pt-1 pt-md-5 pb-3">Most popular movies</h1>
          <MovieList movies={popular}/>
        </Row>
        <Row>
          <h5 id="popular_genres" className="fw-bolder text-center pt-1 pt-md-5 pb-3">Genres</h5>
          <KeywordsSection keywords={genres} prefix="genre"/>
        </Row>
        <Row>
          <h1 id="recent_movies"  className="fw-bolder text-center pt-1 pt-md-5 pt-4 pb-3">Recent Movies</h1>
          <MovieList movies={recent}/>
        </Row>
        <Row>
          <h5 id="popular_genres" className="fw-bolder text-center pt-1 pt-md-5 pb-3">Popular Actors</h5>
          <KeywordsSection keywords={cast} prefix="person"/>
        </Row>
      </Container>
    </Layout>
  )
}

export default TVShowPage

export const query = graphql`
  query {
    recent: allShowsJson(sort: {fields: release_date, order: DESC}, limit: 30) {
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
    budget: allShowsJson(sort: {fields: budget, order: DESC}, limit: 1) {
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
    popular: allShowsJson(sort: {fields: tmdb_popularity, order: DESC}, limit: 30) {
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
    keywords: allShowsJson(limit: 500) {
      group(field: keywords) {
        fieldValue
        totalCount
      }
    }
    genres: allShowsJson(limit: 100) {
      group(field: genres) {
        fieldValue
        totalCount
      }
    }
    cast: allShowsJson(limit: 1000) {
      group(field: cast) {
        fieldValue
        totalCount
      }
    }
  }
`