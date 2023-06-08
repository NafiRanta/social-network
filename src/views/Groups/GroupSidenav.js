import React from 'react';
import Avatar from '../../components/Avatar/Avatar';
import { Link } from 'react-router-dom';

function GroupSidenav(props) {
    return(
        <div>
        <ul className="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
            <h3><strong>Groups</strong></h3>
            <li className="dropdown-item p-1 rounded">
                <Link to="/groups" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/hLkEFzsCyXC.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">For you</p>
                    </div>
                </Link>
            </li>
            <li className="dropdown-item p-1 rounded">
                <Link to="/allgroups" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">Discover</p>
                    </div>
                </Link>
            </li>
            <li className="dropdown-item p-1">
                <Link to="/mygroups" href="#" className="d-flex align-items-center text-decoration-none text-dark">
                    <div className="p-2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="from fb" className="rounded-circle" id="avatar"/>
                    </div>
                    <div>
                        <p className="m-0">My Groups</p>
                    </div>
                </Link>
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