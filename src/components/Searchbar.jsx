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
    <div>
      <input
        type="text"
        placeholder="Enter location"
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
