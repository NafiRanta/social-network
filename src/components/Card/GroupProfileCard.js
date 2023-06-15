import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
function GroupProfileCard(props) {



    return (
        <div className="row1">
            <div className="cols col-lg-3">
                <div className="card shadow d-flex justify-content-center align-items-center">
                    <img src="https://source.unsplash.com/collection/happy-people" className="card-img-top rounded-top" alt="Designer desk" />
                    <div className="card-body ">   
                        <h3 className="card-title mt-4"><strong>Ålands köp och sälj</strong></h3>
                        <p className="card-text">Environmentally friendly, social, completely simple.</p>
                            <Link
                                to="/singlegroup" // Specify the desired path to redirect to
                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                                >
                                View
                            </Link>
                        
                    </div>
                </div>        
            </div>
            <div className="cols col-lg-3">
                <div className="card shadow d-flex justify-content-center align-items-center">  
                    <img src="https://source.unsplash.com/collection/happy-people" className="card-img-top rounded-top" alt="Designer desk" />
                    <div className="card-body ">   
                        <h3 className="card-title mt-4"><strong>Ålands köp och sälj</strong></h3>
                        <p className="card-text">Environmentally friendly, social, completely simple.</p>
                        <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">View</a>
                    </div>
                </div>        
            </div>
            <div className="cols col-lg-3">
                <div className="card shadow d-flex justify-content-center align-items-center">
                    <img src="https://source.unsplash.com/collection/happy-people" className="card-img-top rounded-top" alt="Designer desk" />
                    <div className="card-body ">   
                        <h3 className="card-title mt-4"><strong>Ålands köp och sälj</strong></h3>
                        <p className="card-text">Environmentally friendly, social, completely simple.</p>
                        <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">View</a>
                    </div>
                </div>        
            </div>
            <div className="cols col-lg-3">
                <div className="card shadow d-flex justify-content-center align-items-center">
                    <img src="https://source.unsplash.com/collection/happy-people" className="card-img-top rounded-top" alt="Designer desk" />
                    <div className="card-body ">   
                        <h3 className="card-title mt-4"><strong>Ålands köp och sälj</strong></h3>
                        <p className="card-text">Environmentally friendly, social, completely simple.</p>
                        <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">View</a>
                    </div>
                </div>        
            </div>
            <div className="cols col-lg-3">
                <div className="card shadow d-flex justify-content-center align-items-center">
                    <img src="https://source.unsplash.com/collection/happy-people" className="card-img-top rounded-top" alt="Designer desk" />
                    <div className="card-body ">   
                        <h3 className="card-title mt-4"><strong>Ålands köp och sälj</strong></h3>
                        <p className="card-text">Environmentally friendly, social, completely simple.</p>
                        <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">View</a>
                    </div>
                </div>        
            </div>
        </div> 
    )
}

export default GroupProfileCard;

