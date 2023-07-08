import React, { useRef } from 'react'; 
import { BsSearch } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function SearchbarGlobal(props) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const inputRef = useRef(null);

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e, email, username) => {
    e.stopPropagation();
    console.log("Clicked user:", email, "username:", username);
    // link to user profile
    navigate(`/othersprofile/${username}`);
  };

  const handleDropdownToggle = (isOpen, event, metadata) => {
    if (isOpen && inputRef.current && inputRef.current.contains(document.activeElement)) {
      // Keep the dropdown open when clicking inside the input field
      return;
    }

    // Close the dropdown for other toggle events
    if (!isOpen) {
      return;
    }
    return true;
  };

  const displayAllUsers = () => {
    const allusers = props.allusers;
    if (!allusers) {
      return null; 
    }
    // return all users except the current user in alphabetical order
    let filteredData = allusers.filter((user) => user.username !== userInfo.username);
    filteredData.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
    return filteredData.map(user => {
      const username = user.firstname + " " + user.lastname;
      return (
        <div 
          key={user.username} 
          className="alert fade show p-1 m-0 d-flex align-items-center justify-content-between" 
          role="alert" 
          onClick={(e) => handleButtonClick(e, user.email, username)}
        >
          <div className="d-flex align-items-center">
            <p className="m-0">{user.firstname + " " + user.lastname}</p>
          </div>
            <BsSearch />
        </div>  
      );
    });
  };

  return (
    <Dropdown onToggle={handleDropdownToggle}>
      <Dropdown.Toggle variant="light" id="searchMenu">
        <div className="input-group-text bg-gray border-0 rounded-pill" id="input-group-text-pill">
          <i className="fas fa-search me-2 text-muted"></i>
          <p className="m-0 fs-7 text-muted">Search ÅlandSocial</p>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="overflow-auto border-0 shadow p-3" aria-labelledby="searchMenu">
        <Dropdown.Item>
          <input
            type="text"
            className="rounded-pill border-0 bg-gray dropdown-item"
            placeholder="Search ÅlandSocial..."
            onClick={handleInputClick}
            ref={inputRef}
          />
        </Dropdown.Item>
        <Dropdown.Item className="my-4">
          {displayAllUsers()}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchbarGlobal;
