import { cardsSelector } from "../../features/cards/cardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchEditorCardsByIdDocument, updateDocumentbyID } from "../../services/card.service";
import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";
import { Reorder } from "framer-motion";

export const OutlinerEditor = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const documentId = "6308bb12efffad7ac9721336";

  useEffect(() => {
    console.log("useeeffect");
    dispatch(fetchEditorCardsByIdDocument(documentId));
  }, [dispatch]);

  const [cardsState, setCardsState] = useState<CardModel[]>([]);
  useEffect(() => { setCardsState(cards) }, [cards]);


  const RenderCards = () => {   
    console.log(cardsState)
   
    return (
      <Reorder.Group axis="y" values={cardsState} onReorder={setCardsState}>
        {cardsState?.map((card: CardModel) => (
          <Reorder.Item key={card.id} value={card} as='div'>
            {<Card key={card.id} card={card} />}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
  };

  return <div className="outliner_cards">{RenderCards()}</div>;
};
