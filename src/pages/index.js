import * as React from 'react'
import { graphql, Link } from 'gatsby' 
import Layout from '../components/Layout'

const IndexPage = ({data}) => {
  console.log(data)
  const movies = data.allMoviesJson.edges
  const list = movies.map(i => (
    <div key={i.node.id}>
      <p>
        <Link to={`/movie/${i.node.slug}`}>
          {i.node.title}
        </Link>
      </p>
      <p>{i.node.release_date}</p>
      <p>----- ----- -----</p>
    </div>
  ))
  return (
    <Layout>
      {list}

    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMoviesJson(sort: {fields: release_date, order: DESC}, limit: 1000) {
      edges {
        node {
          id
          title
          slug
          release_date(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`