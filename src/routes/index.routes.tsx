import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { DocumentPage } from "../pages/document/document.page";
import Editor from "../pages/editor/editor.page";
import Outliner from "../pages/outliner/outliner.page";
import { ProjectPage } from "../pages/project/project.page";
import { WorkspacePage } from "../pages/workspace/workspace.page";

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/document/:id" element={<DocumentPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/outliner/:id" element={<Outliner />} />
          <Route path="/" element={<Navigate to="/workspace" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
