import { cardsSelector } from "../../features/cards/cardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { fetchEditorCardsByIdDocument } from "../../services/card.service";
import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";

export const DocumentEditor = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const documentId = "630634ea84814d030f6e0241";

  useEffect(() => {
    dispatch(fetchEditorCardsByIdDocument(documentId));
  }, [dispatch]);

  const renderCards = () => {
    return cards?.map((card: CardModel) => <Card key={card.id} card={card} />);
  };
  return <div className="outliner_cards">{renderCards()}</div>;
};
