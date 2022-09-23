import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { documentSelector } from "../../features/document/documentSlice";

import DocumentModel from "../../models/document.model";
import CardModel from "../../models/card.model";

import { Card } from "../card/card.component";

import { updateEditorCardsDocumentByID } from "../../services/document.service";

import { Reorder } from "framer-motion";
import { cardSelector } from "../../features/cards/cardsSlice";

interface OutlinerEditorProps {
  document: DocumentModel;
}

export const OutlinerEditor: React.FC<OutlinerEditorProps> = ({ document }) => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentSelector);
  const card = useAppSelector(cardSelector);

  const [cardsState, setCardsState] = useState(documents[0].editorCards);

  const RenderCards = () => {
    let orderCards: string[] = [];
    if (cardsState) {
      for (let i = 0; i < cardsState.length; i++) {
        orderCards.push(cardsState[i].id);
      }
    }

    // re-render cards when one card is deleted
    useEffect(() => {
      setCardsState(documents[0].editorCards);
    }, [
      documents[0].editorCards.length,
      card.content?.length,
      card.title?.length,
    ]);

    // update of the database and the store with each rearrangement of cards
    useEffect(() => {
      dispatch(updateEditorCardsDocumentByID(document.id, orderCards));
    }, [cardsState]);

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
