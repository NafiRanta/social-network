import React from 'react';

function ChatContainerSmall(){
    return(
        <div>
            <div class="col-12 col-lg-3">
                <div class="d-none d-xxl-block h-100 fixed-top end-0 overflow-hidden scrollbar" >
                <div class="p-3 mt-4">
                
                    <hr class="m-0" />
                    <div class="my-3 d-flex justify-content-between align-items-center">
                    <p class="text-muted fs-5 m-0">Contacts</p>
                    </div>
            
                    <li class="dropdown-item rounded my-2 px-0" type="button" data-bs-toggle="modal" data-bs-target="#singleChat1">
            
                    <div class="d-flex align-items-center mx-2 chat-avatar">
                        <div class="position-relative">
                        <img src="https://source.unsplash.com/random/4"  alt="avatar" class="rounded-circle me-2"/>
                        <span class="position-absolute bottom-0 translate-middle border border-light rounded-circle bg-success p-1" >
                            <span class="visually-hidden"></span>
                        </span>
                        </div>
                        <p class="m-0">Nafi</p>
                    </div>
                    </li>
                </div>
                </div>
            </div>
            <div class="modal fade" id="singleChat1" tabindex="-1" aria-labelledby="singleChat1Label"aria-hidden="true" data-bs-backdrop="false">
      <div class="modal-dialog modal-sm position-absolute bottom-0 end-0 w-17" >
        <div class="modal-content border-0 shadow">

          <div class="modal-header">
            <div class="dropdown-item d-flex rounded" type="button" data-bs-container="body" data-bs-toggle="popover"
              data-bs-placement="left" data-bs-html="true" >
       
              <div class="position-relative">
                <img src="https://source.unsplash.com/random/1" alt="avatar" class="rounded-circle me-2"/>
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
                <img src="https://source.unsplash.com/random/1" alt="avatar" class="rounded-circle me-2" />
              </div>
         
              <p class="bg-gray p-2 rounded">Lorem, ipsum dolor</p>
            </li>
      
            <li class="list-group-item border-0 d-flex justify-content-end">
      
              <p class="bg-gray p-2 rounded">Lorem, ipsum dolor</p>
  
              <div>
                <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle ms-2"/>
              </div>
            </li>
          </div>

          <div class="modal-footer p-0 m-0 border-0">
            <div class="d-flex">
              <div class="d-flex align-items-center">
                <i class="far fa-file-image mx-1 fs-5 text-muted pointer"></i>
              </div>
              <div>
                <input
                  type="text"
                  class="form-control rounded-pill border-0 bg-gray"
                  placeholder="Aa"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
       </div>
    )
}

export default ChatContainerSmall;