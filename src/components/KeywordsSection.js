import { Link } from "gatsby"
import React from "react"
import { slugify } from "../utils/main"

const KeywordsSection = ({keywords, prefix="keyword"}) => {
    let keywordCards = []

    if (keywords && keywords.length) {
        keywordCards = keywords.map(kw => ( <div className="p-4 shadow-sm rounded-sm align-self-center m-1">
        <Link className="text-decoration-none font-weight-bold text-secondary text-center m-auto" to={`/${prefix}/${slugify(kw.fieldValue)}`}>{kw.fieldValue} ({kw.totalCount})</Link>
      </div>))
    }
    return (
        <div className="d-flex justify-content-center flex-wrap">
            {keywordCards}
        </div>
    )
}

export default KeywordsSection