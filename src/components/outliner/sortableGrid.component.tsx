import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { Card } from "../card/card.component";
import { updateOutlinerCardsDocumentByID } from "../../services/document.service";
import CardModel from "../../models/card.model";
import { useMutation, useQueryClient } from "react-query";

export const SortableGrid: React.FC = () => {
  const documentId = "6315c7b206897a97f65ee180";
  const queryClient = useQueryClient();
  const outlinerCards: CardModel[] = queryClient.getQueryData("outlinerCards")!;

  let orderCards: string[] = [];

  const onSortEnd = function (fromIndex: number, toIndex: number) {
    const newCards = arrayMoveImmutable(outlinerCards, fromIndex, toIndex);
    if (newCards) {
      for (let i = 0; i < newCards.length; i++) {
        orderCards.push(newCards[i].id);
      }
    }
    queryClient.setQueryData("outlinerCards", newCards);
    const updatedCards = { id: documentId, cards: orderCards };
    updateOutlinerCardsOrder(updatedCards);
  };
  const { mutate: updateOutlinerCardsOrder } = useMutation(
    updateOutlinerCardsDocumentByID
  );

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
    >
      {outlinerCards.map((card) => (
        <SortableItem key={card.id}>
          <div>
            <Card key={card.id} card={card} className="card_outliner" />
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};
