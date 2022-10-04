import { DocumentEditor } from "../../components/editor/document/documentEditor.component";
import { Header } from "../../components/header-navbar/header/header.component";
import { OutlinerEditor } from "../../components/editor/outliner/outlinerEditor.component";

import "./editorpage.css";
import { ToolBar } from "../../components/toolbar/toolbar.component";
import { useQuery } from "react-query";
import { getEditorCardsByDocumentById } from "../../services/document.service";

const Editor = () => {
  const documentId = "6315c7b206897a97f65ee180";
  const { data: editorCards } = useQuery(
    "editorCards",
    () => getEditorCardsByDocumentById(documentId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <div className="editor_page">
      <Header className="editor_nav"></Header>

      {editorCards && (
        <>
          <ToolBar className="card_document_editor" />
          <div className="editor">
            <div className="document_editor">
              <DocumentEditor />
            </div>
            <div className="outliner_editor">
              <OutlinerEditor />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Editor;
