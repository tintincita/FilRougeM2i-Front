import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { Card } from "../card/card.component";
import { updateOutlinerCardsDocumentByID } from "../../services/document.service";
import CardModel from "../../models/card.model";
import { useMutation, useQueryClient } from "react-query";

interface SortableGridProps {
  id: string;
  filter: () => CardModel[];
}

export const SortableGrid: React.FC<SortableGridProps> = ({ id, filter }) => {
  const queryClient = useQueryClient();
  const outlinerCards: CardModel[] = queryClient.getQueryData("outlinerCards")!;

  let orderCards: string[] = [];

  /**
   * The function is called when the user drags and drops a card. The function then pushes the id of the
   * card to the orderCards array. Then it updates the order of the cards in the database and the query.
   * @param {number} fromIndex - The index of the card that was moved.
   * @param {number} toIndex - The index of the card that was dragged to.
   */
  const onSortEnd = function (fromIndex: number, toIndex: number) {
    const newCards = arrayMoveImmutable(outlinerCards, fromIndex, toIndex);
    /* Pushing the id of the card to the orderCards array. */
    if (newCards) {
      for (let i = 0; i < newCards.length; i++) {
        orderCards.push(newCards[i].id);
      }
    }
    /* Updating the order of the cards in the database and the query */
    queryClient.setQueryData("outlinerCards", newCards);
    const updatedCards = { id: id, cards: orderCards };
    updateOutlinerCardsOrder(updatedCards);
  };

  /* A hook that is used to update order of outlinerCards in the database. */
  const { mutate: updateOutlinerCardsOrder } = useMutation(
    updateOutlinerCardsDocumentByID
  );

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
    >
      {outlinerCards &&
        filter().map((card) => (
          <SortableItem key={card.id}>
            <div>
              <Card key={card.id} card={card} className="card_outliner" />
            </div>
          </SortableItem>
        ))}
    </SortableList>
  );
};
