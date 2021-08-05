import * as React from 'react'
import { graphql, Link } from 'gatsby' 
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Layout from '../../components/Layout'

const BlogPost = ({data}) => {
  console.log(data)
  const movie = data.allMoviesJson.edges[0].node
  const image = getImage(movie.gatsby_image_path)
  const relatedByCast = movie.related_by_cast.map(i => (
    <li>
      <Link to={`/movie/${i.slug}`}>{i.title}</Link>
    </li>
  ))
  return (
    <Layout>
      <div className="">
        <div className="m-auto text-center bg-dark py-2">
          <GatsbyImage className="shadow" image={image} alt=""/>
        </div>

        <Container fluid className="">
          <Row>
            <h1 className="fw-bolder text-center pt-5">Similar movies</h1>
            <p className="text-center">Best movies like <em>{movie.title}</em></p>
            <div>
              <ul>
                {relatedByCast}
              </ul>
            </div>
          </Row>
          <Row>
            <h1 className="fw-bolder text-center pt-5">Movies with similar <em className="text-secondary">posters</em> </h1>
            <p className="text-center">Best movies like <em>{movie.title}</em> with similar plots</p>
            <p className="text-center"> 
            <Button className="mx-1" variant="dark" size="sm">Posters</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Plot</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Release year</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Actors and casting</Button>
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
                  width: 200
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