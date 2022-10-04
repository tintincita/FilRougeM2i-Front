import CardModel from "../../../models/card.model";
import { Card } from "../../card/card.component";
import { updateTitleDocumentById } from "../../../services/document.service";
import { useQueryClient } from "react-query";

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
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update = e.target.value;
    let updateTitle = {
      id: documentId,
      title: update,
    };
    updateTitleDocumentById(updateTitle);
  };

  const renderCards = () => {
    if (!sessionStorage.getItem("selectedCard")) {
      return (
        editorCards && (
          <div className="document_editor_cards">
            {editorCards?.map((card: CardModel) => (
              <Card
                key={card.id}
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
        (card: CardModel) => card.id === selectedCardId
      );
      return (
        <div className="cardById">
          <Card card={selectedCard!} className="selectedCardById" />
        </div>
      );
    }
  };
  return (
    <div>
      <>
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
      </>
      {renderCards()}
    </div>
  );
};
