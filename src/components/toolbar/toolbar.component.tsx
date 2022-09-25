import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";
import DocumentModel from "../../models/document.model";
import { useAppDispatch } from "../../redux/store";
import { getCardById } from "../../services/card.service";
import { deleteCard, NewCard } from "../../services/document.service";

interface ToolBarProps {
  documents: DocumentModel;
  className: string;
}
let DeleteButton = "disabled";
let EditButton = "disabled";
let ColorButton = "disabled";

export const ToolBar: React.FC<ToolBarProps> = ({ documents, className }) => {
  const dispatch = useAppDispatch();

  let thisClassName = "." + className;
  let cards = document.querySelectorAll(thisClassName);

  let documentEditor = document.querySelector(".document_editor");
  let documentTitleEdit = documentEditor?.getElementsByTagName("textarea")[0];
  let documentTitle = documentEditor?.getElementsByTagName("h1")[0];
  let colorPicker = document.querySelector("#color");
  let titleCard = document.querySelectorAll(
    ".card_document_editor_title_view_document"
  );
  let contentCard = document.querySelectorAll(
    ".card_document_editor_content_view_document"
  );

  colorPicker?.addEventListener("input", (e) => {
    e.stopPropagation();
    e.preventDefault();
    let color = (e.target as HTMLInputElement).value;
    // change color when user click after change color
    documentEditor?.addEventListener(
      "click",
      (e) => {
        console.log(e.target);
        if (e.target === documentTitle) {
          documentTitle?.setAttribute("style", `color:${color}`);
        }
        titleCard.forEach((title) => {
          if (e.target === title) {
            title.setAttribute("style", `color:${color}`);
          }
        });
        contentCard.forEach((content) => {
          if (e.target === content) {
            content.setAttribute("style", `color:${color}`);
          }
        });
      },
      true
    );
  });

  // disabled editing cards and editing document title
  const disabledEditCardandTitle = () => {
    cards.forEach((card) => {
      card.getElementsByTagName("textarea")[0].style.display = "none";
      card.getElementsByTagName("textarea")[1].style.display = "none";
      card.getElementsByTagName("h2")[0].style.display = "block";
      card.getElementsByTagName("p")[0].style.display = "block";
    });
    if (documentTitleEdit && documentTitle) {
      documentTitleEdit.style.display = "none";
      documentTitle.style.display = "block";
    }
  };

  // allow edit of title document when click on edit button
  documentTitle?.addEventListener("click", () => {
    if (EditButton === "enabled" && documentTitleEdit && documentTitle) {
      documentTitleEdit.style.display = "block";
      documentTitle.style.display = "none";
    }
  });

  cards.forEach((card) =>
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      let cardId = card.getAttribute("id");
      // Allow Delete cards if delete button is enabled when clicked on card
      if (cardId !== null && DeleteButton === "enabled") {
        dispatch(deleteCard(cardId));
      }
      //change style of card to allow editing when clicked on card in Outliner Page
      if (
        cardId !== null &&
        EditButton === "enabled" &&
        card.className === "card_outliner"
      ) {
        card.getElementsByTagName("textarea")[0].style.display = "block";
        card.getElementsByTagName("textarea")[1].style.display = "block";
        card.getElementsByTagName("h2")[0].style.display = "none";
        card.getElementsByTagName("p")[0].style.display = "none";
      }

      if (
        cardId !== null &&
        EditButton === "enabled" &&
        card.className === "card_document_editor"
      ) {
        console.log(cardId);
        dispatch(getCardById(cardId));
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

    if (DeleteButton === "enabled") {
      DeleteButton = "disabled";
    }
    if (EditButton === "enabled") {
      EditButton = "disabled";
      disabledEditCardandTitle();
    }
    dispatch(NewCard(documents.id));
  }

  // delete cards from document
  function deleteButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    console.log("delete button clicked");
    if (DeleteButton === "enabled") {
      DeleteButton = "disabled";
    } else {
      DeleteButton = "enabled";
    }
    if (EditButton === "enabled") {
      EditButton = "disabled";
      disabledEditCardandTitle();
    }
  }

  // edit cards
  function editButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (DeleteButton === "enabled") {
      DeleteButton = "disabled";
    }
    if (EditButton === "enabled") {
      EditButton = "disabled";
      disabledEditCardandTitle();
    } else {
      EditButton = "enabled";
    }
  }

  // edit color of contents
  function colorButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    console.log(ColorButton);
    e.preventDefault();
    e.stopPropagation();
    if (DeleteButton === "enabled") {
      DeleteButton = "disabled";
    }
    if (EditButton === "enabled") {
      EditButton = "disabled";
      disabledEditCardandTitle();
    }
    // if (ColorButton === "disabled") {
    //   ColorButton = "enabled";
    // }
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
        <FiEdit />
      </button>
      <button className="color_text" onClick={colorButtonOnClick}>
        <IoIosColorPalette />
      </button>
      <input type="color" id="color" defaultValue="#f6b73c" />
    </div>
  );
};
