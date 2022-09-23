import { useEffect, useState } from "react";
import DocumentModel from "../../models/document.model";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { Card } from "../card/card.component";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateOutlinerCardsDocumentByID } from "../../services/document.service";
import { cardSelector } from "../../redux/slices/cards.slice";

interface SortableGridProps {
  documents: DocumentModel[];
}

export const SortableGrid: React.FC<SortableGridProps> = ({ documents }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector(cardSelector);
  const [cards, setCards] = useState(documents[0].outlinerCards);
  console.log(cards);
  const onSortEnd = function (fromIndex: number, toIndex: number) {
    setCards((array) => arrayMoveImmutable(array, fromIndex, toIndex));
  };

  let orderCards: string[] = [];
  if (cards) {
    for (let i = 0; i < cards.length; i++) {
      orderCards.push(cards[i].id);
    }
  }
  console.log(orderCards);

  useEffect(() => {
    dispatch(updateOutlinerCardsDocumentByID(documents[0].id, orderCards));
  }, [cards]);

  useEffect(() => {
    setCards(documents[0].outlinerCards);
  }, [documents[0].outlinerCards.length]);

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
    >
      {cards.map((card) => (
        <SortableItem key={card.id}>
          <div>
            <Card key={card.id} card={card} className="card_outliner" />
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};
