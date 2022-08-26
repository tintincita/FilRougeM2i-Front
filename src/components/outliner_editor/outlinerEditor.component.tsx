import { cardsSelector } from "../../features/cards/cardsSlice";
import store, { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchEditorCardsByIdDocument } from "../../services/card.service";
import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";
import { Reorder } from "framer-motion";

export const OutlinerEditor = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const documentId = "630634ea84814d030f6e0241";

  useEffect(() => {
    console.log("useeeffect");
    dispatch(fetchEditorCardsByIdDocument(documentId));
  }, [dispatch]);

  const [Cards, setCards] = useState(cards);

  const RenderCards = () => {
    console.log("render cards");
    console.log(setCards);
    return (
      <Reorder.Group axis="y" values={Cards} onReorder={setCards}>
        {Cards?.map((card: CardModel) => (
          <Reorder.Item key={card.id} value={card}>
            {<Card key={card.id} card={card} />}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
  };

  return <div className="outliner_cards">{RenderCards()}</div>;
};
