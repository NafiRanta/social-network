import React from 'react';
import Avatar from '../components/Avatar/Avatar';
import SearchbarGlobal from '../components/Searchbar/SearchbarGlobal';

function Topnav(props) {
    return(
      <div className="bg-white d-flex align-items-center fixed-top shadow">
      <div className="container-fluid">
        <div className="row align-items-center">  
          <div className="col d-flex align-items-center">
            <i className="fab fa-facebook text-primary"></i>
            <SearchbarGlobal />
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="mainMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i className="fas fa-plus"></i>
            </div>
            <ul className="dropdown-menu border-0 shadow p-3 overflow-auto" aria-labelledby="mainMenu" id="dropdown-menu-mainmenu">
              <div>
                <div>
                  <li className="p-1 mx-2">
                    <h2>Create</h2>
                  </li>
                  <li className="my-2 p-1">
                    <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                        <i className="fas fa-edit"></i>
                      </div>
                      <div>
                        <p className="m-0">Post</p>
                      </div>
                    </a>
                  </li>
                  <li className="my-2 p-1">
                    <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                        <i className="fas fa-users"></i>
                      </div>
                      <div>
                        <p className="m-0">Group</p>
                      </div>
                    </a>
                  </li>
                </div>
              </div>
            </ul>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2"   type="button" id="chatMenu" >
              <i className="fas fa-users"></i>
            </div>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2"   type="button" id="chatMenu" >
              <i className="fas fa-comment"></i>
            </div>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2"  type="button" id="notMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i className="fas fa-bell"></i>
            </div>
            <ul className="dropdown-menu border-0 shadow p-3" aria-labelledby="notMenu" id="dropdown-menu-notmenu">
              <li className="p-1">
                <div className="d-flex justify-content-between">
                  <h2>Notifications</h2>
                </div>
              </li>
              <li className="my-2 p-1">
                <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-evenly">
                    <div className="p-2">
                      <Avatar />
                    </div>
                  <div>
                      <p className="fs-7 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum unde amet at nulla quae porro.</p>
                      <span className="fs-7 text-primary">about an hour ago</span>
                    </div>
                  </div>
                  <i className="fas fa-circle fs-7 text-primary"></i>
                </a>
              </li>
            </ul>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="secondMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <Avatar />
            </div>
            <ul className="dropdown-menu border-0 shadow p-3" aria-labelledby="notMenu" id="dropdown-menu-notmenu">
                <li className="my-2 p-1">
                  <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                    <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                    <Avatar />
                    </div>
                    <p className="m-0">Nafisah Rantasalmi</p>
                  </a>
                </li>
                <li className="my-2 p-1">
                  <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                    <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                        <i className="fas fa-power-off"></i>
                    </div>
                    <p className="m-0">Log Out</p>
                  </a>
                </li>
             </ul>
          </div>
        </div>
      </div>
      </div>
      
    )
}

export default Topnav;