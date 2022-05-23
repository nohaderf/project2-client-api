import React from "react";

function SearchPatient({ search, onSearchChange }) {

  return (
    <div className="search-div">
      <input
        className="search"
        type="text"
        autoComplete="off"
        id="search"
        placeholder="find patient by last name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <span className="search-icon"> <i className="fas fa-search"></i></span>
    </div>
    
  );
}


export default SearchPatient;

