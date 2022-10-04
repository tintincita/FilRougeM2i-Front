import { DocumentEditor } from "../../components/editor/document/documentEditor.component";
import { Header } from "../../components/header-navbar/header/header.component";
import { OutlinerEditor } from "../../components/editor/outliner/outlinerEditor.component";

import "./editor.page.css";
import { ToolBar } from "../../components/toolbar/toolbar.component";
import { useQuery } from "react-query";
import {
  getEditorCardsByDocumentById,
  getTitleByDocumentById,
} from "../../services/document.service";

const Editor = () => {
  const documentId = "6315c7b206897a97f65ee180";

  const { data: documentTitle } = useQuery(
    "documentTitle",
    () => getTitleByDocumentById(documentId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

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
          <ToolBar className="card_document_editor" id={documentId} />
          <div className="editor">
            <div className="document_editor">
              <DocumentEditor title={documentTitle} documentId={documentId} />
            </div>
            <div className="outliner_editor">
              <OutlinerEditor id={documentId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Editor;
