import React from 'react';
import Avatar from '../Avatar/Avatar';

function SearchbarGlobal() {
    return (
        <div className="input-group ms-2" type="button">
        <span className="input-group-prepend d-lg-none" id="searchMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
          <div className="input-group-text bg-gray border-0 rounded-circle" id="input-group-text-circle">
            <i className="fas fa-search text-muted"></i>
          </div>
        </span>
        <span className="input-group-prepend d-none d-lg-block" id="searchMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
          <div className="input-group-text bg-gray border-0 rounded-pill" id= "input-group-text-pill">
            <i className="fas fa-search me-2 text-muted"></i>
            <p className="m-0 fs-7 text-muted">Search ÅlandSocial</p>
          </div>
        </span>
        <ul className="dropdown-menu overflow-auto border-0 shadow p-3" aria-labelledby="searchMenu" id="dropdown-menu-searchmenu">
          <li>
            <input type="text" className="rounded-pill border-0 bg-gray dropdown-item" placeholder="Search ÅlandSocial..." autoFocus/>
          </li>
          <li className="my-4">
            <div className="alert fade show dropdown-item  p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
              <div className="d-flex align-items-center">
                <Avatar/>
                <p className="m-0">Nafi</p>
              </div>
              <button type="button" className="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </li>
          <li className="my-4">
            <div className="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
              <div className="d-flex align-items-center">
                  <Avatar/>
                  <p className="m-0">Nafi</p>
                </div>
              <button type="button" className="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </li>
        </ul>
      </div>
    )
}

export default SearchbarGlobal;