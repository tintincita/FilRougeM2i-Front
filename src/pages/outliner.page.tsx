import React, { useEffect } from "react";
import { Card } from "../components/card/card.component";
import { cardsSelector} from "../features/cards/cardsSlice";
import CardModel from "../models/card.model";
import { fetchAllCards } from "../services/card.service";
import { useAppDispatch, useAppSelector } from "../store/store";

const Outliner = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);

  useEffect(() => {
    dispatch(fetchAllCards());
  }, [dispatch]);

  const renderCards = () => {
    return cards?.map((card: CardModel) => <Card key={card.id} card={card} />);
  };
  return (
    <div>
      <h1>Cards</h1>
      {renderCards()}
    </div>
  );
};

export default Outliner;
