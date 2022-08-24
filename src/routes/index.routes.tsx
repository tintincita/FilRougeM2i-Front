import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Editor from "../pages/editor.page";
import Outliner from "../pages/outliner.page";

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/outliner" element={<Outliner />} />
          <Route path="/" element={<Navigate to="/outliner" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
