import { useState } from "react";
import "./App.css";
import { Widget } from "./components/widget/Widget";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Светлая тема" : "Темная тема"}
      </button>
      <Widget darkMode={darkMode} />
    </div>
  );
}

export default App;
