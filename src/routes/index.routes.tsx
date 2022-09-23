import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Editor from "../pages/editor/editor.page";
import HomePage from "../pages/home/home.page";
import Outliner from "../pages/outliner/outliner.page";

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/outliner" element={<Outliner />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/homepage" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
