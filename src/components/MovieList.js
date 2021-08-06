import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { img } from './movielist.module.css'

const MovieList = ({movies})=> {
    if (!movies || !movies.length) return ''
    const list = movies.map(i => {
        const m = "node" in i ? i.node : i ;
        let image = getImage(m.gatsby_image_path)
        return (
            <div className={img}>
                <Link to={`/movie/${m.slug}`}>
                    <GatsbyImage className="shadow rounded img-fluid" image={image} alt=""/>
                </Link>
            </div>
        )})
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {list}
        </div>
    )
}

export default MovieList



