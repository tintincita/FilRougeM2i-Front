import React from "react";
import { useAppDispatch } from "../../redux/store";

import { Delete } from "./delete.component";

import CardModel from "../../models/card.model";

import { updateCardById } from "../../services/document.service";
import "./styles/card.css";
import { BsX } from "react-icons/bs";
import { storeDeleteCard } from "../../redux/slices/cards.slice";

interface CardProps {
  card: CardModel;
  className: string;
}

export const Card: React.FC<CardProps> = ({ card, className }) => {
  let update = {
    title: card.title,
    content: card.content,
  };

  const dispatch = useAppDispatch();

  // Title changes
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.title = e.target.value;
    dispatch(updateCardById(card.id, update));
  };

  // Content changes
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.content = e.target.value;
    dispatch(updateCardById(card.id, update));
  };

  const deleteCardInStore = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(storeDeleteCard());
  };

  return (
    <div
      className={className}
      id={card.id}
    >
      <div className={className + "_close"}>
        <BsX onClick={deleteCardInStore} />
      </div>

      <textarea
        name="title"
        className={className + "_card_title"}
        defaultValue={card.title}
        onChange={onChangeTitle}
      />
      <textarea
        name="content"
        className={className + "_card_content"}
        defaultValue={card.content}
        onChange={onChangeContent}
      />
      <h2 className={className + "_title_view_document"}>{card.title}</h2>
      <p className={className + "_content_view_document"}>{card.content}</p>
    </div>
  );
};
