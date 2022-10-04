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
  let update = {
    id: id,
    title: title,
    content: content,
  };

  const { mutate: updateCard } = useMutation(updateCardById, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
      queryClient.invalidateQueries("editorCards");
    },
  });

  // Title changes
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.title = e.target.value;
    updateCard(update);
  };

  // Content changes
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update.content = e.target.value;
    updateCard(update);
  };

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
