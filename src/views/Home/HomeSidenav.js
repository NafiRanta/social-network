import React from 'react';
import Avatar from '../../components/Avatar/Avatar'

function HomeSidenav(){
    return(
        <div class="d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar">
        <ul class="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
             <li class="dropdown-item p-1 rounded">
                <div class="p-2">
                    <div class="d-flex align-items-center">
                        <Avatar/>
                        <p class="m-0">Zuratun Nafisah Rantasalmi</p>
                    </div>
                </div>
            </li>
            <li class="dropdown-item p-1 rounded">
                <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                    <div class="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="from fb" class="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p class="m-0">Followers</p>
                    </div>
                </a>
            </li>
            <li class="dropdown-item p-1">
                <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                    <div class="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="from fb" class="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p class="m-0">Groups</p>
                    </div>
                </a>
            </li>
            <hr class="m-0" />
        </ul>
    </div>
    )
}

export default HomeSidenav;