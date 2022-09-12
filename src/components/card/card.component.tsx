import CardModel from "../../models/card.model";
import { Delete } from "./delete.component";
import { updateCardById } from "../../services/card.service";
import { useAppDispatch } from "../../store/store";
import "../../styles/card.css";
import React from "react";

interface CardProps {
  card: CardModel;
  className?: string;
  idDocument: string;
}

export const Card: React.FC<CardProps> = ({ card, className, idDocument }) => {
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

  const displayCard = () => {
    console.log("double click");
  };

  return (
    <div className={className} onDoubleClick={displayCard}>
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

      <Delete
        id={card.id}
        idDocument={idDocument}
        className={className + "_delete"}
      />
    </div>
  );
};
