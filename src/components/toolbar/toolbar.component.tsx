import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import DocumentModel from "../../models/document.model";
import { useAppDispatch } from "../../redux/store";
import { deleteCard, NewCard } from "../../services/document.service";

interface ToolBarProps {
  documents: DocumentModel;
  className: string;
}
let DeleteButton = "disabled";
let EditButton = "disabled";
export const ToolBar: React.FC<ToolBarProps> = ({ documents, className }) => {
  const dispatch = useAppDispatch();

  let thisClassName = "." + className;
  let cards = document.querySelectorAll(thisClassName);

  const disabledEditCard = () => {
    cards.forEach((card) => {
      card.getElementsByTagName("textarea")[0].style.display = "none";
      card.getElementsByTagName("textarea")[1].style.display = "none";
      card.getElementsByTagName("h2")[0].style.display = "block";
      card.getElementsByTagName("p")[0].style.display = "block";
    });
  };

  cards.forEach((card) =>
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      let cardId = card.getAttribute("id");
      // Allow Delete cards if delete button is enabled
      if (cardId !== null && DeleteButton === "enabled") {
        dispatch(deleteCard(cardId));
      }
      //change style of card to allow editing
      if (cardId !== null && EditButton === "enabled") {
        card.getElementsByTagName("textarea")[0].style.display = "block";
        card.getElementsByTagName("textarea")[1].style.display = "block";
        card.getElementsByTagName("h2")[0].style.display = "none";
        card.getElementsByTagName("p")[0].style.display = "none";
      }
    })
  );

  // add new card to document
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

  // delete cards from document
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

  // edit
  function editButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (DeleteButton == "enabled") {
      DeleteButton = "disabled";
    }
    if (EditButton == "enabled") {
      EditButton = "disabled";
      disabledEditCard();
    } else {
      EditButton = "enabled";
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
      <button className="edit_card" onClick={editButtonOnClick}>
        <FiEdit />{" "}
      </button>
    </div>
  );
};
