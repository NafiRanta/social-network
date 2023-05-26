import React from 'react';
import Avatar from '../components/Avatar/Avatar';

function Topnav(){
    return(
      <div class="bg-white d-flex align-items-center fixed-top shadow">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col d-flex align-items-center">
            <i class="fab fa-facebook text-primary"></i>
            <div class="input-group ms-2" type="button">
              <span class="input-group-prepend d-lg-none" id="searchMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <div class="input-group-text bg-gray border-0 rounded-circle" id="input-group-text-circle">
                  <i class="fas fa-search text-muted"></i>
                </div>
              </span>
              <span class="input-group-prepend d-none d-lg-block" id="searchMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <div class="input-group-text bg-gray border-0 rounded-pill" id= "input-group-text-pill">
                  <i class="fas fa-search me-2 text-muted"></i>
                  <p class="m-0 fs-7 text-muted">Search ÅlandSocial</p>
                </div>
              </span>
              <ul class="dropdown-menu overflow-auto border-0 shadow p-3" aria-labelledby="searchMenu" id="dropdown-menu-searchmenu">
                <li>
                  <input type="text" class="rounded-pill border-0 bg-gray dropdown-item" placeholder="Search ÅlandSocial..." autofocus/>
                </li>
                <li class="my-4">
                  <div class="alert fade show dropdown-item  p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
                    <div class="d-flex align-items-center">
                      <Avatar/>
                      <p class="m-0">Nafi</p>
                    </div>
                    <button type="button" class="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                </li>
                <li class="my-4">
                  <div class="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
                    <div class="d-flex align-items-center">
                        <Avatar/>
                        <p class="m-0">Nafi</p>
                      </div>
                    <button type="button" class="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col d-flex align-items-center justify-content-end">
            <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="mainMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            <ul class="dropdown-menu border-0 shadow p-3 overflow-auto" aria-labelledby="mainMenu" id="dropdown-menu-mainmenu">
              <div>
                <li class="p-1 mx-2">
                  <h2>Menu</h2>
                </li>
                <li class="my-2 p-1">
                  <a href="#" class="text-decoration-none text-dark d-flex align-items-center justify-content-between">
                    <div class="p-2">
                      <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="icon from fb" class="rounded-circle" />
                    </div>
                    <div>
                      <p class="m-0">Followers</p>
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
                      <p class="m-0">Groups</p>
                      <span class="fs-7 text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, commodi.</span>
                    </div>
                  </a>
                </li>
                <li class="my-2 p-1">
                <hr />
                <div>
                  <li class="p-1 mx-2">
                    <h2>Create</h2>
                  </li>
                  <li class="my-2 p-1">
                    <a href="#" class="text-decoration-none text-dark d-flex align-items-center">
                      <div class="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                        <i class="fas fa-edit"></i>
                      </div>
                      <div>
                        <p class="m-0">Post</p>
                      </div>
                    </a>
                  </li>
                
                <li class="my-2 p-1">
                  <a href="#" class="text-decoration-none text-dark d-flex align-items-center">
                    <div class="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                      <i class="fas fa-users"></i>
                    </div>
                    <div>
                      <p class="m-0">Group</p>
                    </div>
                  </a>
                </li>
              </div>
                </li>
              </div>
            </ul>
            <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2"   type="button" id="chatMenu" >
              <i class="fas fa-comment"></i>
            </div>
            <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2"  type="button" id="notMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i class="fas fa-bell"></i>
            </div>
            <ul class="dropdown-menu border-0 shadow p-3" aria-labelledby="notMenu" id="dropdown-menu-notmenu">
              <li class="p-1">
                <div class="d-flex justify-content-between">
                  <h2>Notifications</h2>
                </div>
              </li>
              <li class="my-2 p-1">
                <a href="#" class="text-decoration-none text-dark d-flex align-items-center">
                  <div class="d-flex align-items-center justify-content-evenly">
                    <div class="p-2">
                      <Avatar />
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
                <Avatar />
            </div>
            <ul class="dropdown-menu border-0 shadow p-3" aria-labelledby="notMenu" id="dropdown-menu-notmenu">
              <li class="my-2 p-1">
                  <li class="p-1 mx-2">
                    <div class="d-flex align-items-center">
                        <Avatar />
                        <p class="m-0">Zuratun Nafisah Rantasalmi</p>
                    </div>
                  </li>
                  <li class="my-2 p-1">
                    <a href="#" class="text-decoration-none text-dark d-flex align-items-center">
                      <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                          <i class="fas fa-cog bg-gray p-2 rounded-circle"></i>
                      </div>
                      <p class="m-0">Settings</p>
                    </a>
                  </li>
                  <li class="my-2 p-1">
                    <a href="#" class="text-decoration-none text-dark d-flex align-items-center">
                      <div class="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                          <i class="fas fa-power-off bg-gray p-2 rounded-circle"></i>
                      </div>
                      <p class="m-0">Log Out</p>
                    </a>
                  </li>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      
    )
}

export default Topnav;