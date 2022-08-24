import React, { useEffect } from "react";
import { Card } from "../components/card/card.component";
import { cardsSelector } from "../features/cards/cardsSlice";
import CardModel from "../models/card.model";
import {
  fetchAllCards,
  fetchCardsByIdDocument,
  NewCard,
} from "../services/card.service";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AiOutlinePlus } from "react-icons/ai";

const Outliner = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const documentId = "6304c4ac2b4f84b256f33681";
  useEffect(() => {
    dispatch(fetchCardsByIdDocument(documentId));
  }, [dispatch]);

  const renderCards = () => {
    return cards?.map((card: CardModel) => <Card key={card.id} card={card} />);
  };
  return (
    <div>
      <h1>Cards</h1>
      {renderCards()}
      <button onClick={() => dispatch(NewCard(documentId))}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Outliner;
