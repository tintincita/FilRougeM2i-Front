import CardModel from "../../../models/card.model";
import { Card } from "../../card/card.component";
import { updateTitleDocumentById } from "../../../services/document.service";
import { useQueryClient } from "react-query";
import "./documentEditor.css";

interface DocumentEditorProps {
  title: string;
  documentId: string;
}
export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  title,
  documentId,
}) => {
  const queryClient = useQueryClient();
  const editorCards: CardModel[] = queryClient.getQueryData("editorCards")!;

  let update = "";

  /**
   * OnChangeTitle is a function that takes an event as an argument and updates the title of a document
   * in the database.
   * @param e - React.ChangeEvent<HTMLTextAreaElement>
   */
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update = e.target.value;
    let updateTitle = {
      Id: documentId,
      title: update,
    };
    updateTitleDocumentById(updateTitle);
  };

  /* Rendering the cards in the document editor. */
  const renderCards = () => {
    if (!sessionStorage.getItem("selectedCard")) {
      return (
        editorCards && (
          <div className="document_editor_cards">
            {editorCards?.map((card: CardModel) => (
              <Card
                key={card._id}
                card={card}
                className="card_document_editor"
              />
            ))}
          </div>
        )
      );
    } else {
      let selectedCardId = sessionStorage.getItem("selectedCard");
      let selectedCard = editorCards.find(
        (card: CardModel) => card._id === selectedCardId
      );
      let editor = document.getElementsByClassName(
        "editor"
      )[0] as HTMLDivElement;
      editor?.scrollTo(0, 0);
      return (
        <div className="cardById">
          <Card card={selectedCard!} className="selectedCardById" />
        </div>
      );
    }
  };

  return (
    <div className="document_editor">
      {sessionStorage.getItem("EditButton") === "enabled" ? (
        <textarea
          name="title"
          className={"document_title_edit"}
          defaultValue={title}
          onChange={onChangeTitle}
        />
      ) : (
        <h1 className="document_title">{title}</h1>
      )}
      {renderCards()}
    </div>
  );
};
