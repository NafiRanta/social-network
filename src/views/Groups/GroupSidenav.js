import React from 'react';
import Avatar from '../../components/Avatar/Avatar'

function GroupSidenav() {
    return(
        <div className="d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar">
        <ul className="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
            <h3><strong>Groups</strong></h3>
                <li className="dropdown-item p-1 rounded">
                    <div className="p-2">
                        <div className="d-flex align-items-center">
                            <Avatar/>
                            <p className="m-0">Zuratun Nafisah Rantasalmi</p>
                        </div>
                    </div>
                </li>
            <li className="dropdown-item p-1 rounded">
                <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/hLkEFzsCyXC.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">Your feed</p>
                    </div>
                </a>
            </li>
            <li className="dropdown-item p-1 rounded">
                <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">All groups</p>
                    </div>
                </a>
            </li>
            <li className="dropdown-item p-1">
                <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">My Groups</p>
                    </div>
                </a>
            </li>
            <li className="dropdown-item p-1">
                <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">+ Create new group</a>
            </li>
            <hr className="m-0" />
        </ul>
    </div>
    )
}

export default GroupSidenav;