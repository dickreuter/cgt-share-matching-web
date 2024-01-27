import React from "react";
import Header from "./components/Header";
import FileUpload from "./views/Calculator";
import Instructions from "./components/Instructions";
import Results from "../components/Results";
import "./Main.css";

function App() {
  return (
    <div className="App">
      <Header />
      <FileUpload />
    </div>
  );
}

export default App;
