import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import DocumentModel from "../../models/document.model";
import { useAppDispatch } from "../../redux/store";
import { deleteCard, NewCard } from "../../services/document.service";
import { Delete } from "../card/delete.component";

interface ToolBarProps {
  documents: DocumentModel;
}

export const ToolBar: React.FC<ToolBarProps> = ({ documents }) => {
  console.log(documents.id);
  const dispatch = useAppDispatch();
  return (
    <div className="toolbar">
      <button
        onClick={() => {
          dispatch(NewCard(documents.id));
          console.log("new card");
        }}
        className="add_card"
      >
        <AiOutlinePlus />
      </button>
      <button
        className="delete_card"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("delete card");
          let cards = document.querySelectorAll(".card_outliner");
          cards.forEach((card) =>
            card.addEventListener("click", (e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log(card.getAttribute("id"));
              let cardId = card.getAttribute("id");
              if (cardId !== null) {
                dispatch(deleteCard(cardId));
              }
            })
          );
        }}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};
