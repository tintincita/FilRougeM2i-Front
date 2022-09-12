import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";

import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";
import { Reorder } from "framer-motion";
import DocumentModel from "../../models/document.model";
import { updateDocumentByID } from "../../services/document.service";

import { documentSelector } from "../../features/document/documentSlice";

interface OutlinerEditorProps {
  document: DocumentModel;
}

export const OutlinerEditor: React.FC<OutlinerEditorProps> = ({ document }) => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentSelector);

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
    }, [documents[0].editorCards.length]);

    // update of the database and the store with each rearrangement of cards
    useEffect(() => {
      dispatch(updateDocumentByID(document.id, orderCards));
    }, [cardsState]);

    return (
      <Reorder.Group axis="y" values={cardsState} onReorder={setCardsState}>
        {cardsState?.map((card: CardModel) => (
          <Reorder.Item key={card.id} value={card} as="div">
            {
              <Card
                key={card.id}
                card={card}
                idDocument={document.id}
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
