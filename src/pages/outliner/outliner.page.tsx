import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { documentSelector } from "../../redux/slices/document.slice";

import { Header } from "../../components/header-navbar/header/header.component";

import { fetchDocumentById, NewCard } from "../../services/document.service";

import { AiOutlinePlus } from "react-icons/ai";
import "./outlinerpage.css";
import "../../components/header-navbar/header/styles/header.css";
import { SortableGrid } from "../../components/outliner/sortableGrid.component";
import { ToolBar } from "../../components/toolbar/toolbar.component";

const Outliner = () => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentSelector);
  const documentId = "6315c7b206897a97f65ee180";

  useEffect(() => {
    dispatch(fetchDocumentById(documentId));
  }, [dispatch]);

  return (
    <div className="outliner-page">
      <Header className="outliner_nav"></Header>
      {documents?.map((document: any) => {
        if (document.id === documentId) {
          return <ToolBar document={document} />;
        }
      })}
      <div className="outliner_cards">
        {documents?.map((document: any) => {
          if (document.id === documentId) {
            return <SortableGrid documents={documents} />;
          }
        })}
      </div>
    </div>
  );
};

export default Outliner;
