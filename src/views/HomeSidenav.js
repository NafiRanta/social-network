import React from 'react';

function HomeSidenav(){
    return(
        <div class="d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar">
            <ul class="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
                <li class="dropdown-item p-1 rounded">
                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                        <div class="p-2">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="from fb" class="rounded-circle" id="avatar"/>
                        </div>
                        <div>
                            <p class="m-0">My Groups</p>
                            <i class="fas fa-circle text-primary" id="fas-fa-circle"></i>
                            <span class="fs-7 text-primary"> 1 new</span>
                        </div>
                    </a>
                </li>
                <li class="dropdown-item p-1">
                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                        <div class="p-2">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="from fb" class="rounded-circle" id="avatar"/>
                        </div>
                        <div>
                            <p class="m-0">All Groups</p>
                        </div>
                    </a>
                </li>
                <li class="dropdown-item p-1">
                    <a href="#" class="d-flex align-items-center justify-content-between text-decoration-none text-dark">
                        <div class="d-flex align-items-center justify-content-evenly">
                            <div class="p-2">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/0gH3vbvr8Ee.png" alt="from fb" class="rounded-circle" id="avatar"/>
                            </div>
                            <div>
                                <p class="m-0">Create Groups</p>
                            </div>
                        </div>
                    </a>
                </li>
                <hr class="m-0" />
            </ul>
        </div>
    )
}

export default HomeSidenav;