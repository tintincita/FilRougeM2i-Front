import { cardsSelector } from "../../features/cards/cardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { fetchCardsByIdDocument } from "../../services/card.service";
import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";

export const OutlinerEditor = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const documentId = "6304c4ac2b4f84b256f33681";

  useEffect(() => {
    dispatch(fetchCardsByIdDocument(documentId));
  }, [dispatch]);

  const renderCards = () => {
    return cards?.map((card: CardModel) => <Card key={card.id} card={card} />);
  };
  return <div className="outliner_cards">{renderCards()}</div>;
};
