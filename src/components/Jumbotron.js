import React from 'react'

const Jumbotron = () => {
    return (
        <div className="p-5 mb-4 text-white bg-dark ">
            <div className="container-fluid py-5 ml-0 ml-md-5">
                <h1 className="display-5 fw-bold">Find Similar Movies</h1>
                <p className="col-md-8 fs-4">
                    Find movies that are similar to the ones you already enjoy. <br/>
                    If you dont find here what to watch next, I am afraid there is no hope for you.
                </p>
                <a href="#popular_movies" className="text-decoration-none text-dark">
                    <button className="btn btn-light btn-lg m-1" type="button">
                        Popular Movies
                    </button>
                </a> 
                <a href="#recent_movies" className="text-decoration-none text-dark">
                    <button className="btn btn-light btn-lg m-1" type="button">
                       Recent Movies
                    </button>
                </a> 
            </div>
        </div>
    )
}

export default Jumbotron