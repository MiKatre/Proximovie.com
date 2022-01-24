import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { wrapper } from './movielist.module.css'

const MovieList = props => {
    if (!props.movies || !props.movies.length) return ''
    const movies = props.movies
    const prefix = props.isTvShow ? "tv" : "movie" ;
    let minHeight = 225
    let width = 300
    if (props.width) {
        width = props.width
    }
    if (props.minHeight) {
        minHeight = minHeight.minHeight
    }
    const list = movies.map(i => {
        const m = "node" in i ? i.node : i ;
        let image = getImage(m.gatsby_image_path)
        return (
            <div className={wrapper}>
                <Link to={`/${prefix}/${m.slug}`} className="text-decoration-none">
                    <div className="d-flex flex-column " style={{maxWidth: width}}>
                        <div style={{minHeight: minHeight}}>
                            <GatsbyImage className="rounded img-fluid" image={image} alt={m.title}/>
                        </div>
                        <span className="text-dark text-decoration-none text-center p-1">
                            {m.title}
                        </span>
                    </div>
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



