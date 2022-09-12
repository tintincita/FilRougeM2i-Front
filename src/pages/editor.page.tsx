import { DocumentEditor } from "../components/document_editor/documentEditor.component";
import { Header } from "../components/header/header.component";
import { OutlinerEditor } from "../components/outliner_editor/outlinerEditor.component";
import "../styles/editorpage.css";

const Editor = () => {
  return (
    <div>
      <Header className="editor_nav"></Header>
      <div className="editor_page">
        <div className="outliner_editor">
          <OutlinerEditor />
        </div>
        <div className="document_editor">
          <DocumentEditor />
        </div>
      </div>
    </div>
  );
};

export default Editor;
