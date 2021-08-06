import * as React from 'react'
import { graphql } from 'gatsby' 
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col, Container, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Layout from '../../components/Layout'
import MovieList from '../../components/MovieList'

const BlogPost = ({data}) => {
  const movie = data.allMoviesJson.edges[0].node
  const image = getImage(movie.gatsby_image_path)

  return (
    <Layout>
      <div className="" >
        <div className="text-white" style={{backgroundColor:"#131313"}} > 
          
          <Container className="p-3" >
            <Row>
              <Col className="text-end">
                <GatsbyImage className="shadow rounded m-md-0 mx-5 mb-3" image={image} alt={movie.title}/>
              </Col>
              <Col>
                <h1 className="display-6 fw-bold">{movie.title}</h1>
                <p>{movie.release_date} <br/>
                <span className="text-secondary">Actors</span>: Robert Downey Junior, Emma Watson   <br/>
                <span className="text-secondary">Genres</span>: Action, Adventure, Fantastix <br/>
                <span className="text-secondary">Countries</span>: United States <br/>
                <span className="text-secondary">Production</span>: Marvel Studios Picture</p>
              </Col>
            </Row>

          </Container>
        </div>


        <Container fluid className="">
          <Row>
            <h1 className="fw-bolder text-center pt-5">Similar movies</h1>
            <p className="text-center">Best movies like <em>{movie.title}</em></p>
            <div>
              <MovieList movies={movie.related_by_cast}/>
            </div>
          </Row>
          <Row>
            <h1 className="fw-bolder text-center pt-5">Movies with similar <em className="text-secondary">posters</em> </h1>
            <p className="text-center">Best movies like <em>{movie.title}</em> with similar posters</p>
            <p className="text-center"> 
            <Button className="mx-1" variant="dark" size="sm">Posters</Button>
            {/* <Button className="mx-1" variant="outline-dark" size="sm">Titles</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Plots</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Release</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Casting</Button> */}
            </p>
            <div>
              <MovieList movies={movie.related_by_poster}/>
            </div>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query MyQuery($id: String) {
    allMoviesJson(filter: {id: {eq: $id}}) {
      edges {
        node {
          title
          release_date(formatString: "MMMM D, YYYY")
          gatsby_image_path {
            childImageSharp {
              gatsbyImageData(
                width: 300
                placeholder: BLURRED
              )
            }
          }
          related_by_cast {
            title
            slug
            gatsby_image_path {
              childImageSharp {
                gatsbyImageData(
                  width: 300
                  placeholder: BLURRED
                )
              }
            }
          }
          related_by_poster {
            title
            slug
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
  }
`