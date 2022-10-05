import { BsX } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { updateCardById } from "../../services/card.service";

interface CardEditProps {
  title: string;
  content: string;
  id: string;
  className: string;
}
export const CardEdit: React.FC<CardEditProps> = ({
  title,
  content,
  id,
  className,
}) => {
  
  const queryClient = useQueryClient();

/* Creating an object with the id, title and content for update cards. */
  let update = {
    id: id,
    title: title,
    content: content,
  };

 /* A hook that is used to update the card. */
  const { mutate: updateCard } = useMutation(updateCardById, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
      queryClient.invalidateQueries("editorCards");
    },
  });


/**
  * "onChangeTitle is a function that takes an event as an argument, and then updates the title of
  * the card with the value of the event."
  * 
  * @param e - React.ChangeEvent<HTMLTextAreaElement>
  */
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.title = e.target.value;
    updateCard(update);
  };

 
 /**
  * "onChangeContent is a function that takes an event as an argument, and then updates the content of
  * the card with the value of the event."
  * 
  * @param e - React.ChangeEvent<HTMLTextAreaElement>
  */
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.content = e.target.value;
    updateCard(update);
  };

 /**
  * It removes the selectedCard from sessionStorage and then invalidates the query.
  */
  function closeSelectedCard() {
    sessionStorage.removeItem("selectedCard");
    queryClient.invalidateQueries("editorCards");
  }

  return (
    <div>
      {className === "selectedCardById" ? (
        <div className={className + "_close"}>
          <BsX onClick={closeSelectedCard} />
        </div>
      ) : null}
      <textarea
        id={id}
        name="title"
        className={className + "_card_title"}
        defaultValue={title}
        onChange={onChangeTitle}
      />
      <textarea
        id={id}
        name="content"
        className={className + "_card_content"}
        defaultValue={content}
        onChange={onChangeContent}
      />
    </div>
  );
};