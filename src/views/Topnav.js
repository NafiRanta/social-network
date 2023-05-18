import React from 'react';

function Topnav(){
    return(
        <div class="bg-white d-flex align-items-center fixed-top shadow">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col d-flex align-items-center">
              <i class="fab fa-facebook text-primary"></i>
              <div class="input-group ms-2" type="button">
                <span class="input-group-prepend d-lg-none" id="searchMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                  <div class="input-group-text bg-gray border-0 rounded-circle" >
                    <i class="fas fa-search text-muted"></i>
                  </div>
                </span>
                <span class="input-group-prepend d-none d-lg-block" id="searchMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                  <div class="input-group-text bg-gray border-0 rounded-pill">
                    <i class="fas fa-search me-2 text-muted"></i>
                    <p class="m-0 fs-7 text-muted">Search Flexbook</p>
                  </div>
                </span>
                <ul class="dropdown-menu overflow-auto border-0 shadow p-3" aria-labelledby="searchMenu" >
                  <li>
                    <input type="text" class="rounded-pill border-0 bg-gray dropdown-item" placeholder="Search ÅlandSocial..." autofocusS/>
                  </li>
                  <li class="my-4">
                    <div class="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
                      <div class="d-flex align-items-center">
                        <img src="https://source.unsplash.com/random/1" alt="avatar" class="rounded-circle me-2"/>
                        <p class="m-0">Lorem ipsum</p>
                      </div>
                      <button type="button" class="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </li>
                  <li class="my-4">
                    <div class="alert fade show dropdown-item  p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
                      <div class="d-flex align-items-center">
                        <img src="https://source.unsplash.com/random/2" alt="avatar" class="rounded-circle me-2" />
                        <p class="m-0">Lorem ipsum</p>
                      </div>
                      <button type="button" class="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </li>
                  <li class="my-4">
                    <div
                      class="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
                      <div class="d-flex align-items-center">
                        <img src="https://source.unsplash.com/random/3" alt="avatar" class="rounded-circle me-2"/>
                        <p class="m-0">Lorem ipsum</p>
                      </div>
                      <button type="button" class="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col d-flex align-items-center justify-content-end">
              <div class="align-items-center justify-content-center d-none d-xl-flex">
                <img src="https://source.unsplash.com/collection/happy-people"class="rounded-circle me-2" alt="avatar"/>
                <p class="m-0">John</p>
              </div>
              <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="mainMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <i class="fas fa-ellipsis-h"></i>
              </div>
              <ul class="dropdown-menu border-0 shadow p-3 overflow-auto" aria-labelledby="mainMenu" >
                <div>
                  <li class="p-1 mx-2">
                    <h2>Menu</h2>
                  </li>
                  <li class="my-2 p-1">
                    <a href="#" class="text-decoration-none text-dark d-flex align-items-center justify-content-between">
                      <div class="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="icon from fb" class="rounded-circle"/>
                      </div>
                      <div>
                        <p class="m-0">My Groups</p>
                        <span class="fs-7 text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, commodi.</span>
                      </div>
                    </a>
                  </li>
                  <li class="my-2 p-1">
                    <a href="#" class="text-decoration-none text-dark d-flex align-items-center justify-content-between">
                      <div class="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="icon from fb" class="rounded-circle" />
                      </div>
                      <div>
                        <p class="m-0">All Groups</p>
                        <span class="fs-7 text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, commodi.</span>
                      </div>
                    </a>
                  </li>
                  <li class="my-2 p-1">
                    <a href="#" class="text-decoration-none text-dark d-flex align-items-center justify-content-between">
                      <div class="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/0gH3vbvr8Ee.png" alt="icon from fb" class="rounded-circle"/>
                      </div>
                      <div>
                        <p class="m-0">Create Groups</p>
                        <span class="fs-7 text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, commodi.</span>
                      </div>
                    </a>
                  </li>
                </div>
              </ul>
              <div
                class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="chatMenu" >
                <i class="fas fa-comment"></i>
              </div>
              <div
                class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="notMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <i class="fas fa-bell"></i>
              </div>
              <ul class="dropdown-menu border-0 shadow p-3" aria-labelledby="notMenu">
                <li class="p-1">
                  <div class="d-flex justify-content-between">
                    <h2>Notifications</h2>
                  </div>
                </li>
                <li class="my-2 p-1">
                  <a href="#" class="d-flex align-items-center justify-content-evenly text-decoration-none text-dark">
                    <div class="d-flex align-items-center justify-content-evenly">
                      <div class="p-2">
                        <img src="https://source.unsplash.com/random/1" alt="avatar" class="rounded-circle" />
                      </div>
                      <div>
                        <p class="fs-7 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum unde amet at nulla quae porro.</p>
                        <span class="fs-7 text-primary">about an hour ago</span>
                      </div>
                    </div>
                    <i class="fas fa-circle fs-7 text-primary"></i>
                  </a>
                </li>
              </ul>
              <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="secondMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <i class="fas fa-cog bg-gray p-2 rounded-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Topnav;