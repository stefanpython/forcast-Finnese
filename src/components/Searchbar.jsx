import { useState } from "react";
import "./Searchbar.css";
import PropTypes from "prop-types";

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setQuery("");
    }
  };

  return (
    <div className="search-container">
      <div className="nav">
        <img className="logo" src="./summer.png" alt="" />
        <h1 className="title">Forecast Finnesse</h1>
      </div>

      <div className="search-right">
        <input
          type="text"
          placeholder="Enter location"
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
