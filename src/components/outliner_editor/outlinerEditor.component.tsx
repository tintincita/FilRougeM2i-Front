import { useAppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { updateDocumentbyID } from "../../services/card.service";
import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";
import { Reorder } from "framer-motion";
import axios from "axios";

export const OutlinerEditor = () => {
  const dispatch = useAppDispatch();
  const documentId = "6315c7b206897a97f65ee180";

  const [cardsState, setCardsState] = useState<CardModel[]>([]);

  useEffect(() => {
    console.log("useeeffect");
    const fetchCards = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/document/${documentId}`
      );
      const cardsData = await response.data.editorCards;
      setCardsState(cardsData);
    };
    fetchCards();
  }, []);

  const RenderCards = () => {
    let orderCards: string[] = [];
    for (let i = 0; i < cardsState.length; i++) {
      orderCards.push(cardsState[i].id);
    }

    useEffect(() => {
      dispatch(updateDocumentbyID(documentId, orderCards));
    }, [cardsState]);
    console.log(cardsState);

    return (
      <Reorder.Group axis="y" values={cardsState} onReorder={setCardsState}>
        {cardsState?.map((card: CardModel) => (
          <Reorder.Item key={card.id} value={card} as="div">
            {
              <Card
                key={card.id}
                card={card}
                className="card_outliner_editor"
              />
            }
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
  };

  return <div className="outliner_editor_cards">{RenderCards()}</div>;
};
