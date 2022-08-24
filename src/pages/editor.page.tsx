import { DocumentEditor } from "../components/document_editor/documentEditor.component";
import { OutlinerEditor } from "../components/outliner_editor/outlinerEditor.component";
import "../styles/editorpage.css";

const Editor = () => {
  return (
    <div className="editor_page">
      <div className="outliner_editor">
        <OutlinerEditor />
      </div>
      <div className="document_editor">
        <DocumentEditor />
      </div>
    </div>
  );
};

export default Editor;
