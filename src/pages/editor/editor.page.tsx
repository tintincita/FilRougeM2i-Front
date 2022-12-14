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
import { useParams } from "react-router-dom";
import { Footer } from "../../components/footer/footer.component";

const Editor = () => {
  const params = useParams();

  /* Fetching data of document title from the database. */
  const { data: documentTitle } = useQuery(
    "documentTitle",
    () => getTitleByDocumentById(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  /* A hook that is fetching data of editor cards from the database. */
  const { data: editorCards } = useQuery(
    "editorCards",
    () => getEditorCardsByDocumentById(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <div className="editor_page">
      <Header className="editor_nav" id={params.id!}></Header>
      {editorCards && (
        <>
          <ToolBar className="editor" id={params.id!} />
          <div className="editor">
            <DocumentEditor title={documentTitle} documentId={params.id!} />
            <OutlinerEditor id={params.id!} />
          </div>
        </>
      )}
      <Footer
        entity="Editor Cards"
        table={editorCards}
        documentTitle={documentTitle}
      />
    </div>
  );
};

export default Editor;
