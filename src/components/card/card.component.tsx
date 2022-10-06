import React from "react";
import CardModel from "../../models/card.model";
import { deleteCard } from "../../services/card.service";
import "./styles/cardEditorOutliner.css";
import "./styles/cardEditorDocument.css";
import "./styles/cardOutliner.css";
import { useMutation, useQueryClient } from "react-query";
import { CardContent } from "./cardContent.component";
import { CardEdit } from "./cardEdit.component";

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
  function actionsCardOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      deleteCardByID(card._id);
    }
    if (
      sessionStorage.getItem("EditButton") === "enabled" &&
      className === "card_document_editor"
    ) {
      sessionStorage.setItem("selectedCard", card._id);
      queryClient.invalidateQueries("editorCards");
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

  return (
    <div className={className} id={card._id} onClick={actionsCardOnClick}>
      {renderCard()}
    </div>
  );
};
