import { useEffect } from "react";


import { DocumentEditor } from "../../components/editor/document/documentEditor.component";
import { Header } from "../../components/header-navbar/header/header.component";
import { OutlinerEditor } from "../../components/editor/outliner/outlinerEditor.component";

// import { fetchDocumentById } from "../../services/document.service";

import "./editorpage.css";
import { ToolBar } from "../../components/toolbar/toolbar.component";

const Editor = () => {
  // let documents = useAppSelector(documentSelector);
  // const documentId = "6315c7b206897a97f65ee180";
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchDocumentById(documentId));
  // }, []);
  // return (
  //   <div className="editor_page">
  //     <Header className="editor_nav"></Header>
  //     {/* {documents?.map((document: any) => {
  //       if (document.id === documentId) {
  //         return (
  //           <ToolBar documents={document} className="card_document_editor" />
  //         );
  //       }
  //     })} */}

  //     {documents?.map((document: any) => {
  //       if (document.id === documentId) {
  //         return (
  //           <div className="editor">
  //             <div className="outliner_editor">
  //               <OutlinerEditor document={document} />
  //             </div>
  //             <div className="document_editor">
  //               <DocumentEditor document={document} />
  //             </div>
  //           </div>
  //         );
  //       }
  //     })}
  //   </div>
  return (
    <div></div>
  )
  
};

export default Editor;
