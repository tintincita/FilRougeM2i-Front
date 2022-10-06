import CardModel from "../../../models/card.model";
import { Card } from "../../card/card.component";
import { updateOutlinerCardsDocumentByID } from "../../../services/document.service";
import { useMutation, useQueryClient } from "react-query";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";

interface OutlinerEditorProps {
  id: string;
}
export const OutlinerEditor: React.FC<OutlinerEditorProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const editorCards: CardModel[] = queryClient.getQueryData("editorCards")!;
  let orderCards: string[] = [];

  /**
   * The function is called when the user drags and drops a card. The function then pushes the id of the
   * card to the orderCards array. Then it updates the order of the cards in the database and the query.
   * @param {number} fromIndex - The index of the card that was moved.
   * @param {number} toIndex - The index of the card that was dragged to.
   */
  const onSortEnd = function (fromIndex: number, toIndex: number) {
    const newCards = arrayMoveImmutable(editorCards, fromIndex, toIndex);
    /* Pushing the id of the card to the orderCards array. */
    if (newCards) {
      for (let i = 0; i < newCards.length; i++) {
        orderCards.push(newCards[i]._id);
      }
    }
    /* Updating the order of the cards in the database and the query */
    queryClient.setQueryData("editorCards", newCards);
    const updatedCards = { id: id, cards: orderCards };
    updateOutlinerCardsOrder(updatedCards);
  };

  /* A hook that is used to update the order of outliner cards in the database. */
  const { mutate: updateOutlinerCardsOrder } = useMutation(
    updateOutlinerCardsDocumentByID
  );

  return (
    <div className="outliner_editor_cards">
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {editorCards.map((card) => (
          <SortableItem key={card._id}>
            <div>
              <Card
                key={card._id}
                card={card}
                className="card_outliner_editor"
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  );
};
