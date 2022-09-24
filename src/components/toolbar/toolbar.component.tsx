import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import DocumentModel from "../../models/document.model";
import { useAppDispatch } from "../../redux/store";
import { deleteCard, NewCard } from "../../services/document.service";

interface ToolBarProps {
  documents: DocumentModel;
  className: string;
}
let DeleteButton = "disabled";
export const ToolBar: React.FC<ToolBarProps> = ({ documents, className }) => {
  console.log(documents.id);
  const dispatch = useAppDispatch();

  let thisClassName = "." + className;
  let cards = document.querySelectorAll(thisClassName);
  cards.forEach((card) =>
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      let cardId = card.getAttribute("id");
      if (cardId !== null && DeleteButton === "enabled") {
        dispatch(deleteCard(cardId));
      }
    })
  );

  function addButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(NewCard(documents.id));
    if (DeleteButton == "enabled") {
      DeleteButton = "disabled";
    }
  }

  function deleteButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (DeleteButton == "enabled") {
      DeleteButton = "disabled";
    } else {
      DeleteButton = "enabled";
    }
  }
  return (
    <div className="toolbar">
      <button onClick={addButtonOnClick} className="add_card">
        <AiOutlinePlus />
      </button>
      <button className="delete_card" onClick={deleteButtonOnClick}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};
