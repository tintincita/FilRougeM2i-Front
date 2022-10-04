import CardModel from "../../../models/card.model";
import { Card } from "../../card/card.component";
import {updateOutlinerCardsDocumentByID} from "../../../services/document.service";
import { useMutation, useQueryClient } from "react-query";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";

interface OutlinerEditorProps {}

export const OutlinerEditor: React.FC<OutlinerEditorProps> = ({}) => {
  const queryClient = useQueryClient();
  const editorCards: CardModel[] = queryClient.getQueryData("editorCards")!;
  const documentId = "6315c7b206897a97f65ee180";
  console.log(editorCards);
  let orderCards: string[] = [];

  const onSortEnd = function (fromIndex: number, toIndex: number) {
    const newCards = arrayMoveImmutable(editorCards, fromIndex, toIndex);
    if (newCards) {
      for (let i = 0; i < newCards.length; i++) {
        orderCards.push(newCards[i].id);
      }
    }
    queryClient.setQueryData("editorCards", newCards);
    const updatedCards = { id: documentId, cards: orderCards };
    updateOutlinerCardsOrder(updatedCards);
  };
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
          <SortableItem key={card.id}>
            <div>
              <Card
                key={card.id}
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
