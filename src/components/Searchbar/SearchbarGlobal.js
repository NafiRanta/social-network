import React, { useRef } from 'react'; // a hook to create mutable reference (value tt can b modified/updated w/o re-rendering)
import { Dropdown } from 'react-bootstrap';
import Avatar from '../Avatar/Avatar';
import { useState, useEffect } from 'react';
// useRef is used to create a reference to the dropdown menu element. 
// returns a JS object with a current property that can be used to access the referenced value or element.
// then used to check if a click event occurs within the dropdown menu. 
// maintain a reference to the dropdown menu element across renders without causing a re-render.

function SearchbarGlobal(props) {
  console.log("allusers search globalbar" , props.allusers)
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const handleDropdownToggle = (isOpen, event, metadata) => {
    if (isOpen && inputRef.current && inputRef.current.contains(document.activeElement)) {
      // Keep the dropdown open when clicking inside the input field
      return;
    }

    // Close the dropdown for other toggle events
    // You can add additional logic here if needed
    // For example, to handle pressing the Escape key to close the dropdown
    if (!isOpen) {
      return;
    }
    return true;
  };

  // write a function to display all of the users from props.allusers in the search bar
   const displayAllUsers = () => {
    return props.allusers.map((user) => {
      // return firstname and lastname from user
      const username = user.firstname + " " + user.lastname;
      return (
        <Dropdown.Item className="my-4">
          <div className="alert fade show p-1 m-0 d-flex align-items-center justify-content-between" role="alert">
            <div className="d-flex align-items-center">
              <Avatar />
              <p className="m-0">{username}</p>
            </div>
            <button type="button" className="btn-close p-0 m-0" data-bs-dismiss="alert" aria-label="Close" onClick={handleButtonClick}></button>
          </div>
        </Dropdown.Item>
      );
    })
  }
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
