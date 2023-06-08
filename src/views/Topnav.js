import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Avatar from '../components/Avatar/Avatar';
import SearchbarGlobal from '../components/Searchbar/SearchbarGlobal';

function Topnav(props) {
  return (
    <div className="bg-white d-flex align-items-center fixed-top shadow">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center">
            <i className="fab fa-facebook text-primary"></i>
            <SearchbarGlobal />
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <div className="mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="mainMenu"
                  className="bg-transparent border-0"
                >
                  <i className="fas fa-plus"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu border-0 shadow p-3 overflow-auto"
                  aria-labelledby="mainMenu"
                >
                  <div>
                    <div>
                      <Dropdown.Item as="li" className="p-1 mx-2">
                        <h2>Create</h2>
                      </Dropdown.Item>
                      <Dropdown.Item as="li" className="my-2 p-1">
                        <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                          <div className="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                            <i className="fas fa-edit"></i>
                          </div>
                          <div>
                            <p className="m-0">Post</p>
                          </div>
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item as="li" className="my-2 p-1">
                        <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                          <div className="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                            <i className="fas fa-users"></i>
                          </div>
                          <div>
                            <p className="m-0">Group</p>
                          </div>
                        </a>
                      </Dropdown.Item>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="chatMenu">
              <i className="fas fa-users"></i>
            </div>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="chatMenu">
              <i className="fas fa-comment"></i>
            </div>
            <div className="mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="notMenu"
                  className="bg-transparent border-0"
                >
                  <i className="fas fa-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu border-0 shadow p-3"
                  aria-labelledby="notMenu"
                >
                  <Dropdown.Item as="li" className="p-1">
                    <div className="d-flex justify-content-between">
                      <h2>Notifications</h2>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="li" className="my-2 p-1">
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
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="secondMenu"
                  className="bg-transparent border-0"
                >
                  <Avatar />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu border-0 shadow p-3"
                  aria-labelledby="secondMenu"
                >
                  <Dropdown.Item as="li" className="my-2 p-1">
                    <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                        <Avatar />
                      </div>
                      <p className="m-0">{props.username}</p>
                    </a>
                  </Dropdown.Item>
                  <Dropdown.Item as="li" className="my-2 p-1">
                    <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                        <i className="fas fa-power-off"></i>
                      </div>
                      <p className="m-0">Log Out</p>
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topnav;

