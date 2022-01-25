import React, {useState} from 'react'
import { graphql, Link } from 'gatsby' 
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap'
import Layout from '../../components/Layout'
import MovieList from '../../components/MovieList'
import { slugify } from '../../utils/main'
import Seo from '../../components/Seo'
import './movie.css'

const MoviePage = ({data}) => {
  
  const [tab, setTab] = useState("posters")

  const movie = data.allMoviesJson.edges[0].node
  const image = getImage(movie.gatsby_image_path)
  const overview = movie.overview
  const genres = movie.genres.map(i => (<span className="text-secondary">, <Link className="text-decoration-none" to={`/genre/${slugify(i)}`}>{i}</Link></span>))
  const countries = movie.production_countries.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/country/${slugify(i)}`}>{i}</Link>, </span>))
  const production = movie.production_companies.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/company/${slugify(i)}`}>{i}</Link>, </span>))
  const actors = movie.cast.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/person/${slugify(i)}`}>{i}</Link>, </span>))
  const crew = movie.crew.map(i => (<span className="text-secondary"><Link className="text-decoration-none" to={`/person/${slugify(i)}`}>{i}</Link>, </span>))
  let keywordCards = []

  if (movie.keywords && movie.keywords.length) {
    keywordCards = movie.keywords.map(i => ( <div className="p-2 p-md-3 shadow-sm rounded-sm align-self-center m-1">
    <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/keyword/${slugify(i)}`}>{i}</Link>
  </div>))
  }


  const crewCards = movie.crew.map(i => ( <div className="p-2 p-md-3 shadow-sm rounded-sm align-self-center m-1">
    <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/person/${slugify(i)}`}>{i}</Link>
  </div>))
  const castCards = movie.cast.map(i => ( <div className="p-2 p-md-3 shadow-sm rounded-sm align-self-center m-1">
    <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/person/${slugify(i)}`}>{i}</Link>
  </div>))
  const countryCards = movie.production_countries.map(i => ( <div className="p-2 p-md-3 shadow-sm rounded-sm align-self-center m-1">
    <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/country/${slugify(i)}`}>{i}</Link>
  </div>))
  const productionCards = movie.production_companies.map(i => ( <div className="p-2 p-md-3 shadow-sm rounded-sm align-self-center m-1">
    <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/company/${slugify(i)}`}>{i}</Link>
  </div>))


  const title = `Best movies like ${movie.title} (${movie.release_date})`
  const description = `Discover movies like ${movie.title} (${movie.release_date}): ${movie.related_by_cast[0].title}, ${movie.related_by_cast[1].title}, ${movie.related_by_cast[2].title}, ${movie.related_by_cast[3].title}`

  if (movie.related_by_poster === null && tab !== "actors") {
    setTab("actors")
  }

  return (
    <Layout>
      <Seo 
        title={title}
        description={description}
        image={typeof image === "undefined" ? null : image.images.fallback.src}
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
                  <h2 className="fw-lighter mb-1">Overview</h2> 
                  <p>
                    {overview} 
                  </p>
                </div>
                <div className="text-start">
                  <p>
                    <span className="fw-bold text-secondary">Countries</span> <br/>
                    {countries.slice(0, 4)} 
                  </p>
                  {/* <p>
                    <span className="fw-bold text-secondary">Producion companies</span> <br/>
                    {production.slice(0, 4)}
                  </p> */}
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
          <div>
            <div className="text-center m-auto fw-lighter mt-2">Explore similar themes</div>
            <div className="d-flex justify-content-center flex-wrap">
              {keywordCards.slice(0,6)}
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              {keywordCards.slice(6,12)}
            </div>
          </div>

          <Row>
            <h1 className="fw-bolder text-center pt-5">Similar movies</h1>
            <p className="text-center">Best movies like <em>{movie.title}</em></p>
            <div>
              <MovieList movies={movie.related_most_similar} scroll width={250}/>
            </div>
          </Row>
          <div>
            <div className="text-center m-auto fw-lighter mt-2">Explore similar themes</div>
            <div className="d-flex justify-content-center flex-wrap">
              {keywordCards.slice(12,18)}
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              {keywordCards.slice(18,24)}
            </div>
          </div>
          <Row>
            <h1 className="fw-bolder text-center pt-5">Movies with similar <em className="text-secondary">{tab}</em> </h1>
            <p className="text-center">Best movies like <em>{movie.title}</em> with similar {tab}</p>
            <p className="text-center"> 
            {/* <Button className="mx-1" variant="dark" size="sm">Posters</Button> */}


            <Tabs
              activeKey={tab} 
              onSelect={(eventKey) => setTab(eventKey) }
              transition={false}
              id="noanim-tab-example"
              className="pills-dark"
              variant="pills"
            >

              {movie.related_by_poster && 
                <Tab eventKey="posters" title="Posters" tabClassName="m-auto">
                  <div>
                    <MovieList movies={movie.related_by_poster} scroll width={250}/>
                  </div>
                </Tab>
              }

              <Tab eventKey="actors" title="Actors">
                <div>
                  <MovieList movies={movie.related_by_cast} scroll width={250}/>
                </div>
              </Tab>

              { movie.related_by_overview && 
                <Tab eventKey="plot" title="Plot">
                  <div>
                    <MovieList movies={movie.related_by_overview} scroll width={250}/>
                  </div>
                </Tab>
              }

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

          <div>
            <div className="text-center m-auto fw-lighter mt-2">Explore <span className="fw-bold">crew members</span></div>
            <div className="d-flex justify-content-center flex-wrap">
              {crewCards.slice(0,4)}
            </div>

          </div>

          <div>
            <div className="text-center m-auto fw-lighter mt-2">Explore <span className="fw-bold">main actors</span></div>
            <div className="d-flex justify-content-center flex-wrap">
              {castCards.slice(0,4)}
            </div>
          </div>

          <div>
            <div className="text-center m-auto fw-lighter mt-2">Explore same <span className="fw-bold">countries</span></div>
            <div className="d-flex justify-content-center flex-wrap">
              {countryCards.slice(0,4)}
            </div>
          </div>

          <div>
            <div className="text-center m-auto fw-lighter mt-2">Explore the <span className="fw-bold">production companies</span></div>
            <div className="d-flex justify-content-center flex-wrap">
              {productionCards.slice(0,4)}
            </div>
          </div>

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
          overview
          genres
          keywords
          cast
          crew
          gatsby_image_path {
            childImageSharp {
              gatsbyImageData(
                width: 350
                placeholder: TRACED_SVG
              )
            }
          }
          related_most_similar {
            title
            slug
            gatsby_image_path {
              childImageSharp {
                gatsbyImageData(
                  height:450
                  width: 300
                  placeholder: TRACED_SVG
                )
              }
            }
          }
          related_by_cast {
            title
            slug
            gatsby_image_path {
              childImageSharp {
                gatsbyImageData(
                  height:450
                  width: 300
                  placeholder: TRACED_SVG
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
                  height:450
                  width: 300
                  placeholder: TRACED_SVG
                )
              }
            }
          }
          related_by_overview {
            title
            slug
            gatsby_image_path {
              childImageSharp {
                gatsbyImageData(
                  height:450
                  width: 300
                  placeholder: TRACED_SVG
                )
              }
            }
          }
        }
      }
    }
  }
`