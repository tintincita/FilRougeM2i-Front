import { useEffect } from "react";
import { DocumentEditor } from "../components/document_editor/documentEditor.component";
import { Header } from "../components/header/header.component";
import { OutlinerEditor } from "../components/outliner_editor/outlinerEditor.component";
import { documentSelector } from "../features/document/documentSlice";
import { fetchDocumentById } from "../services/document.service";
import { useAppDispatch, useAppSelector } from "../store/store";
import "../styles/editorpage.css";

const Editor = () => {
  let documents = useAppSelector(documentSelector);
  const documentId = "6315c7b206897a97f65ee180";
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDocumentById(documentId));
  }, []);
  return (
    <div>
      <Header className="editor_nav"></Header>

      {documents?.map((document: any) => {
        if (document.id === documentId) {
          return (
            <div className="editor_page">
              <div className="outliner_editor">
                <OutlinerEditor document={document} />
              </div>
              <div className="document_editor">
                <DocumentEditor document={document} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Editor;
