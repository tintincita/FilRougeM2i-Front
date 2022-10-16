import React from "react";
import CardModel from "../../models/card.model";
import { deleteCard, updateDisplayCardById } from "../../services/card.service";
import "./styles/cardEditorOutliner.css";
import "./styles/cardEditorDocument.css";
import "./styles/cardOutliner.css";
import { useMutation, useQueryClient } from "react-query";
import { CardContent } from "./cardContent.component";
import { CardEdit } from "./cardEdit.component";
import { BiHide } from "react-icons/bi";
import { TiEye } from "react-icons/ti";

interface CardProps {
  card: CardModel;
  className: string;
}

export const Card: React.FC<CardProps> = ({ card, className }) => {
  const queryClient = useQueryClient();

  /* A hook that is used to delete card. */
  const { mutate: deleteCardByID } = useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
      queryClient.invalidateQueries("editorCards");
    },
  });

  /**
   * If the delete button is enabled, delete the card by ID. If the edit button is enabled and the
   * class name is card_document_editor, set the selected card to the card ID and invalidate the
   * queries.
   * @param e - {
   */
  function actionsCardOnClick(e: any) {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      let divDelete = document.createElement("div");
      divDelete.style.textAlign = "center";
      let p = document.createElement("p");
      p.innerHTML = "Are you sure you want to delete this entity?";
      p.style.textAlign = "center";
      p.style.padding = "10px";
      p.style.width = "100%";
      p.style.fontSize = "20px";
      p.style.fontWeight = "bold";
      p.style.color = "red";

      divDelete.appendChild(p);
      divDelete.style.position = "absolute";
      divDelete.style.left = e.clientX + "px";
      divDelete.style.top = e.clientY + "px";

      let buttonConfirm = document.createElement("button");
      buttonConfirm.innerHTML = "Confirm";
      buttonConfirm.style.margin = "10px";
      buttonConfirm.style.color = "red";
      buttonConfirm.style.border = "none";
      buttonConfirm.style.cursor = "pointer";

      let buttonCancel = document.createElement("button");
      buttonCancel.innerHTML = "Cancel";
      buttonCancel.style.color = "red";
      buttonCancel.style.border = "none";
      buttonCancel.style.cursor = "pointer";

      divDelete.appendChild(buttonConfirm);
      divDelete.appendChild(buttonCancel);

      document.body.appendChild(divDelete);

      buttonConfirm.addEventListener("click", () => {
        deleteCardByID(card._id);
        document.body.removeChild(divDelete);
      });
      buttonCancel.addEventListener("click", () => {
        document.body.removeChild(divDelete);
      });
    }
    if (
      sessionStorage.getItem("EditButton") === "enabled" &&
      className === "card_document_editor"
    ) {
      sessionStorage.setItem("selectedCard", card._id);
      queryClient.invalidateQueries("editorCards");
      const editor = document.querySelector(".editor");
      if (editor) {
        sessionStorage.setItem("editorScrollTop", editor.scrollTop.toString());
      }
    }
  }

  /**
   * If the sessionStorage item "EditButton" is enabled and the className is either "card_outliner" or
   * "selectedCardById" then return the CardEdit component, otherwise return the CardContent component.
   * @returns The renderCard() function is being returned.
   */
  function renderCard() {
    if (
      sessionStorage.getItem("EditButton") === "enabled" &&
      (className === "card_outliner" || className === "selectedCardById")
    ) {
      return (
        <CardEdit
          className={className}
          title={card.title}
          content={card.content}
          id={card._id}
        />
      );
    } else {
      return (
        <CardContent
          id={card._id}
          title={card.title}
          content={card.content}
          className={className}
        />
      );
    }
  }

  /* Updating the display of the card. */
  const { mutate: updateDisplayCard } = useMutation(updateDisplayCardById, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
      queryClient.invalidateQueries("editorCards");
    },
  });

  /**
   * If the className is card_outliner, then update the outliner to hidden and the editor to block. If
   * the className is card_outliner_editor, then update the outliner to block and the editor to hidden.
   */
  function hide() {
    if (className === "card_outliner") {
      let update = {
        id: card._id,
        outliner: "hidden",
        editor: "block",
      };
      updateDisplayCard(update);
    }
    if (className === "card_outliner_editor") {
      let update = {
        id: card._id,
        outliner: "block",
        editor: "hidden",
      };
      updateDisplayCard(update);
    }
  }

  /**
   * When the user clicks on the card, the card's display is updated to show the card's outliner and
   * editor.
   */
  function display() {
    let update = {
      id: card._id,
      outliner: "block",
      editor: "block",
    };
    updateDisplayCard(update);
  }

  return (
    <div className={className} id={card._id} onClick={actionsCardOnClick}>
      {renderCard()}
      {className === "card_document_editor" ||
      className === "selectedCardById" ? null : (
        <div className="card_buttons">
          <button id={card._id} className="hide_outliner" onClick={hide}>
            <BiHide />
          </button>
          <button id={card._id} className="hide_editor" onClick={display}>
            <TiEye />
          </button>
        </div>
      )}
    </div>
  );
};
