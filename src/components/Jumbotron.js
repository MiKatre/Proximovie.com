import React from 'react'

const Jumbotron = () => {
    return (
        <div class="p-5 mb-4 text-white bg-dark ">
            <div class="container-fluid py-5 ml-0 ml-md-5">
                <h1 class="display-5 fw-bold">Find Similar Movies</h1>
                <p class="col-md-8 fs-4">
                    Find movies that are similar to the ones you already enjoy. <br/>
                    If you dont find here what to watch next, I am afraid there is no hope for you.
                </p>
                <a href="#popular_movies" className="text-decoration-none text-dark">
                    <button class="btn btn-light btn-lg m-1" type="button">
                        Popular Movies
                    </button>
                </a> 
                <a href="#recent_movies" className="text-decoration-none text-dark">
                    <button class="btn btn-light btn-lg m-1" type="button">
                       Recent Movies
                    </button>
                </a> 
            </div>
        </div>
        // <div className="container-fluid py-5 text-white bg-dark ">
        //   <h2 className="display-5 fw-bold">Find movies similar to the ones you like.</h2>
        //   <p className="col-md-8 fs-4">If you dont find here what to watch next, I am afraid there is no hope for you.</p>
        //   <button class="btn btn-light btn-lg" type="button">Example button</button>
        // </div>
    )
}

export default Jumbotron