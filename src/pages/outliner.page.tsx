import { useEffect } from "react";
import { Card } from "../components/card/card.component";
import CardModel from "../models/card.model";
import { NewCard } from "../services/card.service";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AiOutlinePlus } from "react-icons/ai";
import { Header } from "../components/header/header.component";

import "../styles/outlinerpage.css";
import "../styles/header.css";
import { fetchDocumentById } from "../services/document.service";
import { documentSelector } from "../features/document/documentSlice";

const Outliner = () => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentSelector);
  const documentId = "6315c7b206897a97f65ee180";
  useEffect(() => {
    dispatch(fetchDocumentById(documentId));
  }, [dispatch]);

  const renderCards = () => {
    for (let i = 0; i < documents.length; i++) {
      if (documentId === documents[i].id) {
        const outlinerCards = documents[i].outlinerCards;
        return outlinerCards?.map((card: CardModel) => (
          <Card
            key={card.id}
            card={card}
            idDocument={documentId}
            className="card_outliner"
          />
        ));
      }
    }
  };

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
        {renderCards()}
      </div>
    </div>
  );
};

export default Outliner;
