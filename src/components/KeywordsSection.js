import { Link } from "gatsby"
import React from "react"
import { slugify } from "../utils/main"
import { ScrollingCarousel } from '@trendyol-js/react-carousel'

const KeywordsSection = ({keywords, prefix="keyword", postfix=""}) => {
    let keywordCards = []

    if (keywords && keywords.length) {
        keywordCards = keywords.map(kw => ( <div className="p-2 p-md-3 shadow-sm rounded-sm align-self-center m-1">
        <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/${prefix}/${slugify(kw.fieldValue)}/${postfix}`}>{kw.fieldValue} ({kw.totalCount})</Link>
      </div>))
    }
    return (
        <div className="d-flex justify-content-center flex-wrap">
            <ScrollingCarousel className="movie-carousel">
                {keywordCards}
            </ScrollingCarousel>
        </div>
    )
}

export default KeywordsSection