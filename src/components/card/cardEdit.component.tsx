import { BsX } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import Editor from "../../pages/editor/editor.page";
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

  /* A function that is used to resize the textarea when the user is typing. */
  const textAreaContent = document.getElementsByClassName(
    "selectedCardById_card_content"
  )[0] as HTMLTextAreaElement;
  if (textAreaContent) {
    textAreaContent.addEventListener("keyup", (e) => {
      let scHeight = textAreaContent.scrollHeight;
      textAreaContent.style.height = "auto";
      textAreaContent.style.height = scHeight + "px";
    });
  }

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
    const editor = document.querySelector(".editor");
    if (editor) {
      editor.scrollTo(0, Number(sessionStorage.getItem("editorScrollTop")));
    }
  }

  return (
    <div className="card_edit">
      <textarea
        id={id}
        name="title"
        className={className + "_card_title"}
        defaultValue={title}
        onChange={onChangeTitle}
        spellCheck="false"
      />
      {className === "selectedCardById" ? (
        <div className={className + "_close"}>
          <BsX onClick={closeSelectedCard} />
        </div>
      ) : null}
      <textarea
        id={id}
        name="content"
        className={className + "_card_content"}
        defaultValue={content}
        onChange={onChangeContent}
        spellCheck="false"
      />
    </div>
  );
};
