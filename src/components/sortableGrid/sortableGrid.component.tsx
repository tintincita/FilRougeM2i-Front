import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { Card } from "../card/card.component";
import { getEditorCardsByDocumentById, updateOutlinerCardsDocumentByID } from "../../services/document.service";
import CardModel from "../../models/card.model";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "./sortableGrid.css";
import { newCard } from "../../services/card.service";

interface SortableGridProps {
  id: string;
  filter: () => CardModel[];
}

export const SortableGrid: React.FC<SortableGridProps> = ({ id, filter }) => {
  const queryClient = useQueryClient();
  const outlinerCards: CardModel[] = queryClient.getQueryData("outlinerCards")!;

  let orderCards: string[] = [];

  
  /* A hook that is fetching data of editor cards from the database. */
  const { data: editorCards } = useQuery(
    "editorCards",
    () => getEditorCardsByDocumentById(id),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

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
      queryClient.setQueryData("outlinerCards", newCards);
      for (let i = 0; i < newCards.length; i++) {
        orderCards.push(newCards[i]._id);
      }
      for (let i = 0; i < editorCards.length; i++) {
       if(!orderCards.includes(editorCards[i]._id)){
         orderCards.push(editorCards[i]._id);
       }
      }
    }

    /* Updating the order of the cards in the database and the query */
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
      {sessionStorage.getItem("EditButton") === "enabled"
        ? outlinerCards &&
          filter().map((card) => (
            <Card key={card._id} card={card} className="card_outliner" />
          ))
        : outlinerCards &&
          filter().map((card) => (
            <SortableItem key={card._id}>
              <div>
                <Card key={card._id} card={card} className="card_outliner" />
              </div>
            </SortableItem>
          ))}
    </SortableList>
  );
};
