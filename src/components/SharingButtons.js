import React from "react"
import "./FeedbackButton.css"

const SharingButtons = () => {
    return (
        <div className="feedback-button btn btn-dark">
            <a className="text-white text-decoration-none" href="mailto:proximovie@icloud.com?subject=Proximovie%20Feedback">
                Feedback
            </a>
        </div>
    )
}

export default SharingButtons