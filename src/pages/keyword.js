import React from "react"
// import kebabCase from "lodash/kebabCase"
import {  graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import KeywordsSection from "../components/KeywordsSection"
import Search from "../components/SearchContainer"

const KeywordsPage = ({data}) => {
    const keywords = data.allMoviesJson.group
    const sorted = [...keywords].sort((a,b) => a.totalCount < b.totalCount).slice(0,20)
  
    return (

        <Layout>
            <Seo 
            title={"All keywords"}
            description={"List of all keyords"}
            // image={typeof image === "undefined" ? null : image.images.fallback.src}
            />
            <div>
                <div>
                <h1 className=" bg-dark text-white fw-bolder text-center p-4">Keywords</h1>
                <h5 className="text-center mb-3 mt-5">Popular</h5>
                <KeywordsSection keywords={sorted}/>

                <h5 className="text-center mb-3 mt-5">All</h5>
                <KeywordsSection keywords={keywords}/>
                </div>
            </div>
        </Layout>

    )
}


export default KeywordsPage

export const pageQuery = graphql`
  query {
    allMoviesJson(limit: 4000) {
        group(field: keywords) {
          fieldValue
          totalCount
        }
    }
  }
`