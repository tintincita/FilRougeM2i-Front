import React, { useEffect } from "react";
import CardModel from "../../models/card.model";

import { deleteCard, updateCardById } from "../../services/document.service";
import "./styles/card.css";
import { BsX } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";

interface CardProps {
  card: CardModel;
  className: string;
}

export const Card: React.FC<CardProps> = ({ card, className }) => {
  const queryClient = useQueryClient();
  let update = {
    title: card.title,
    content: card.content,
  };

  // Title changes
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.title = e.target.value;
    updateCardById(card.id, update);
  };

  // Content changes
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.content = e.target.value;
    updateCardById(card.id, update);
  };


  const { mutate: deleteCardByID } = useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
    },
  });

  function cardsActionsOnClick(e: any) {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      e.preventDefault();
      e.stopPropagation();
      deleteCardByID(card.id);
    }
  }

  return (
    <div className={className} id={card.id} onClick={cardsActionsOnClick}>
      <div className={className + "_close"}>
        <BsX  />
      </div>

      {(sessionStorage.getItem("EditButton")!=="enabled") ?  (
        <div>
          <h2 className={className + "_title_view_document"} id={card.id}>
            {card.title}
          </h2>
          <p className={className + "_content_view_document"} id={card.id}>
            {card.content}
          </p>
        </div>
      ) : (
        <div>
          <textarea
            id={card.id}
            name="title"
            className={className + "_card_title"}
            defaultValue={card.title}
            onChange={onChangeTitle}
          />
          <textarea
            id={card.id}
            name="content"
            className={className + "_card_content"}
            defaultValue={card.content}
            onChange={onChangeContent}
          />
        </div>
      )}
    </div>
  );
};
