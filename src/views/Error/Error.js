import React from 'react';
import './Error.css'

function Error(){
    return(
        <div>
        <section className="error-page section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-12">
                        <div className="error-inner">
                            <h1>404<span>Oop's  sorry we can't find that page!</span></h1>
                            <form className="search-form">
                                <button className="btn" type="submit">Back to home</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
     )
}

export default Error;