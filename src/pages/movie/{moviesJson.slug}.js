import * as React from 'react'
import { graphql, Link } from 'gatsby' 
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap'
import Layout from '../../components/Layout'
import MovieList from '../../components/MovieList'
import { slugify } from '../../utils/main'
import SEO from '../../components/Seo'
import './movie.css'

const MoviePage = ({data}) => {
  const movie = data.allMoviesJson.edges[0].node
  const image = getImage(movie.gatsby_image_path)
  const genres = movie.genres.map(i => (<span className="text-secondary">, <Link className="text-decoration-none" to={`/genre/${slugify(i)}`}>{i}</Link></span>))
  const countries = movie.production_countries.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/country/${slugify(i)}`}>{i}</Link>, </span>))
  const production = movie.production_companies.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/company/${slugify(i)}`}>{i}</Link>, </span>))
  const actors = movie.cast.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/people/${slugify(i)}`}>{i}</Link>, </span>))
  const crew = movie.crew.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/people/${slugify(i)}`}>{i}</Link>, </span>))


  const title = `Best movies like ${movie.title} (${movie.release_date})`
  const description = `Discover movies like ${movie.title} (${movie.release_date}): ${movie.related_by_cast[0].title}, ${movie.related_by_cast[1].title}, ${movie.related_by_cast[2].title}, ${movie.related_by_cast[3].title}`

  return (
    <Layout>
      <SEO 
        title={title}
        description={description}
        image={image.images.fallback.src}
        // article={}
      />
      <div className="" >
        <div className="text-white" style={{backgroundColor:"#131313"}} > 
          
          <Container fluid className="p-3" >
            <Row>
              <Col xs={12} md={{ span: 4, offset: 0 }} lg={{ span: 3, offset: 2 }} className="text-center text-md-end">
                <GatsbyImage className="shadow rounded m-md-0 mx-5 mb-3" image={image} alt={movie.title}/>
              </Col>
              <Col xs={12} md={8} lg={6} className="bg-dark rounded-3 p-3 text-center text-md-start">
                <h1 className="display-6 fw-bold mb-0">{movie.title}</h1>
                <span className="text-secondary text-center text-md-start">{movie.release_date}</span> 
                {genres}
                
                <div className="text-start">
                  <p>
                    <span className="fw-bold text-secondary">Countries</span> <br/>
                    {countries.slice(0, 4)} 
                  </p>
                  <p>
                    <span className="fw-bold text-secondary">Producion companies</span> <br/>
                    {production.slice(0, 4)}
                  </p>
                  <p>
                    <span className="fw-bold text-secondary">Actors</span> <br/>
                    {actors.slice(0, 4)}
                  </p>

                  <p>
                    <span className="fw-bold text-secondary">Crew</span> <br/>
                    {crew.slice(0, 4)}
                  </p>
                </div>
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
            {/* <Button className="mx-1" variant="dark" size="sm">Posters</Button> */}


            <Tabs
              defaultActiveKey="posters"
              transition={false}
              id="noanim-tab-example"
              className="pills-dark"
              variant="pills"
            >

              <Tab eventKey="posters" title="Posters" tabClassName="m-auto">
                <div>
                  <MovieList movies={movie.related_by_poster}/>
                </div>
              </Tab>
              <Tab eventKey="actors" title="Actors">
              <div>
                <MovieList movies={movie.related_by_cast}/>
              </div>
              </Tab>

            </Tabs>


            {/* <Button className="mx-1" variant="outline-dark" size="sm">Titles</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Plots</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Release</Button>
            <Button className="mx-1" variant="outline-dark" size="sm">Casting</Button> */}
            </p>
            {/* <div>
              <MovieList movies={movie.related_by_poster}/>
            </div> */}



          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default MoviePage

export const query = graphql`
  query MyQuery($id: String) {
    allMoviesJson(filter: {id: {eq: $id}}) {
      edges {
        node {
          title
          release_date(formatString: "YYYY")
          production_countries
          production_companies
          genres
          cast
          crew
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