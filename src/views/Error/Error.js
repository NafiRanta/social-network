import React from 'react';
import './Error.css'

function Error(){
    return(
        <div>
        <section class="error-page section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3 col-12">
                        <div class="error-inner">
                            <h1>404<span>Oop's  sorry we can't find that page!</span></h1>
                            <form class="search-form">
                                <button class="btn" type="submit">Back to home</button>
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