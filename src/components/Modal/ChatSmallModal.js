import React from 'react';
import Avatar from '../Avatar/Avatar';
import "./Modal.css";


function ChatSmallModal(){
    return(
        <div class="modal fade" id="singleChat1" tabIndex="-1" aria-labelledby="singleChat1Label"aria-hidden="true" data-bs-backdrop="false">
        <div class="modal-dialog modal-sm position-absolute bottom-0 end-0 w-17" >
            <div class="modal-content border-0 shadow">
                <div class="modal-header">
                    <div class="dropdown-item d-flex rounded" type="button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-html="true" >
                        <div class="position-relative">
                            <Avatar/>
                        </div>
                        <div>
                            <p class="m-0">Nafi</p>
                            <span class="text-muted fs-7">Active Now</span>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0 overflow-auto" >
                    <li class="list-group-item border-0 d-flex">
                        <div>
                            <Avatar/>
                        </div>
                        <p class="bg-gray p-2 rounded">Lorem, ipsum dolor</p>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-end">
                        <p class="bg-gray p-2 rounded">Lorem, ipsum dolor</p>
                        <div>
                            <Avatar/>
                        </div>
                    </li>
                </div>
                <div class="modal-footer p-0 m-0 border-0">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <i class="far fa-file-image mx-1 fs-5 text-muted pointer"></i>
                        </div>
                        <div> 
                            <input type="text" class="form-control rounded-pill border-0 bg-gray" placeholder="Aa"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChatSmallModal;