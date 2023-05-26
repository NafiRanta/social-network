import React from 'react';
import Avatar from '../Avatar/Avatar';

function SearchbarGlobal(){
    return (
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
    )
}

export default SearchbarGlobal;