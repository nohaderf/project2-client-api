import React from "react";

function Search({ search, onSearchChange }) {

  return (
    <div>
      <input
        className="search"
        type="text"
        autoComplete="off"
        id="search"
        placeholder="search by specialty..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <span className="search-icon"> <i className="fas fa-search"></i></span>
    </div>
    
  );
}


export default Search;

