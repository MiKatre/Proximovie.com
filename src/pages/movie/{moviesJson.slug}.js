import * as React from 'react'
import { graphql, Link } from 'gatsby' 
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Layout from '../../components/Layout'
import MovieList from '../../components/MovieList'

const BlogPost = ({data}) => {
  console.log(data)
  const movie = data.allMoviesJson.edges[0].node
  const image = getImage(movie.gatsby_image_path)

  return (
    <Layout>
      <div className="">
        <div className="m-auto text-center bg-dark py-2 ">
          <GatsbyImage className="shadow rounded m-md-0 mx-5 mb-3" image={image} alt=""/>
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
            <p className="text-center">Best movies like <em>{movie.title}</em> with similar plots</p>
            <p className="text-center"> 
            <Button className="mx-1" variant="dark" size="sm">Posters</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Titles</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Plots</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Release</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Casting</Button>
            </p>
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
          gatsby_image_path {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`