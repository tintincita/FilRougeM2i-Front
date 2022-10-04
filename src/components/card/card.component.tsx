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
  console.log(className);
  const { mutate: deleteCardByID } = useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
      queryClient.invalidateQueries("editorCards");
    },
  });

  function actionsCardOnClick(e: any) {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      e.preventDefault();
      e.stopPropagation();
      deleteCardByID(card.id);
    }
    if((sessionStorage.getItem("EditButton") === "enabled") && className==="card_document_editor"){
      e.preventDefault();
      e.stopPropagation();
      sessionStorage.setItem("selectedCard", card.id);
      queryClient.invalidateQueries("editorCards");
    }
  }
  function renderCard() {
    if (
      (sessionStorage.getItem("EditButton") === "enabled" &&
      (className === "card_outliner" || className === "selectedCardById"))
    ) {
      return (
        <CardEdit
          className={className}
          title={card.title}
          content={card.content}
          id={card.id}
        />
      );
    } else {
      return (
        <CardContent
          id={card.id}
          title={card.title}
          content={card.content}
          className={className}
        />
      );
    }
  }

  return (
    <div className={className} id={card.id} onClick={actionsCardOnClick}>
      {renderCard()}
    </div>
  );
};
