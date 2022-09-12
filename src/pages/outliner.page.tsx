import { useEffect } from "react";
import { Card } from "../components/card/card.component";
import { cardsSelector } from "../features/cards/cardsSlice";
import CardModel from "../models/card.model";
import {
  fetchOutlinerCardsByIdDocument,
  NewCard,
} from "../services/card.service";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AiOutlinePlus } from "react-icons/ai";
import { Header } from "../components/header/header.component";

import "../styles/outlinerpage.css";
import "../styles/header.css";

const Outliner = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const documentId = "6315c7b206897a97f65ee180";

  useEffect(() => {
    dispatch(fetchOutlinerCardsByIdDocument(documentId));
  }, [dispatch]);

  const renderCards = () => {
    return cards?.map((card: CardModel) => (
      <Card key={card.id} card={card} className="card_outliner" />
    ));
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
