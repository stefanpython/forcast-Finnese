import "./App.css";
import Weather from "./components/Weather";
import Searchbar from "./components/Searchbar";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("Pitesti");

  const handleSearch = (query) => {
    setCity(query);
  };

  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />

      <Weather city={city} />
    </div>
  );
}

export default App;
