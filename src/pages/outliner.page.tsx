import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { documentSelector } from "../features/document/documentSlice";

import { Card } from "../components/card/card.component";
import { Header } from "../components/header/header.component";

import CardModel from "../models/card.model";

import { fetchDocumentById, NewCard } from "../services/document.service";

import { AiOutlinePlus } from "react-icons/ai";
import "../styles/outlinerpage.css";
import "../styles/header.css";
import { SortableGrid } from "../components/outliner/sortableGrid.component";

const Outliner = () => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentSelector);
  const documentId = "6315c7b206897a97f65ee180";

  useEffect(() => {
    dispatch(fetchDocumentById(documentId));
  }, [dispatch]);

  return (
    <div>
      <Header className="outliner_nav"></Header>
      <div className="outliner_cards">
        <button
          onClick={() => dispatch(NewCard(documentId))}
          className="add_card"
        >
          <AiOutlinePlus />
        </button>
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
