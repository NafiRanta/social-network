import React from 'react';
import Avatar from '../Avatar/Avatar';
import "./Modal.css";


function ChatSmallModal() {
    return(
        <div className="modal fade" id="singleChat1" tabIndex="-1" aria-labelledby="singleChat1Label"aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog modal-sm position-absolute bottom-0 end-0 w-17" >
            <div className="modal-content border-0 shadow">
                <div className="modal-header">
                    <div className="dropdown-item d-flex rounded" type="button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-html="true" >
                        <div className="position-relative">
                            <Avatar/>
                        </div>
                        <div>
                            <p className="m-0">Nafi</p>
                            <span className="text-muted fs-7">Active Now</span>
                        </div>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-0 overflow-auto" >
                    <li className="list-group-item border-0 d-flex">
                        <div>
                            <Avatar/>
                        </div>
                        <p className="bg-gray p-2 rounded">Lorem, ipsum dolor</p>
                    </li>
                    <li className="list-group-item border-0 d-flex justify-content-end">
                        <p className="bg-gray p-2 rounded">Lorem, ipsum dolor</p>
                        <div>
                            <Avatar/>
                        </div>
                    </li>
                </div>
                <div className="modal-footer p-0 m-0 border-0">
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <i className="far fa-file-image mx-1 fs-5 text-muted pointer"></i>
                        </div>
                        <div> 
                            <input type="text" className="form-control rounded-pill border-0 bg-gray" placeholder="Aa"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChatSmallModal;