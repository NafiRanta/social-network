import React from 'react';
import Avatar from '../../components/Avatar/Avatar'

function HomeSidenav(props){
    return(
        <div className="d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar">
        <ul className="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
             <li className="dropdown-item p-1 rounded">
                <div className="p-2">
                    <div className="d-flex align-items-center">
                        <Avatar/>
                        <p className="m-0">{props.username}</p>
                    </div>
                </div>
            </li>
            <li className="dropdown-item p-1 rounded">
                <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">Followers</p>
                    </div>
                </a>
            </li>
            <li className="dropdown-item p-1">
                <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">Groups</p>
                    </div>
                </a>
            </li>
            <hr className="m-0" />
        </ul>
    </div>
    )
}

export default HomeSidenav;