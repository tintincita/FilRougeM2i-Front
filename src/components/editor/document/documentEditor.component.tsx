import CardModel from "../../../models/card.model";
import { Card } from "../../card/card.component";
import { updateTitleDocumentById } from "../../../services/document.service";
import { useQueryClient } from "react-query";

export const DocumentEditor: React.FC = () => {
  const queryClient = useQueryClient();
  const editorCards: CardModel[] = queryClient.getQueryData("editorCards")!;
  const documentId = "6315c7b206897a97f65ee180";


  let update = "";
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    update = e.target.value;
    updateTitleDocumentById(documentId, update);
  };

  const renderCards = () => {
    if (!sessionStorage.getItem("selectedCard")) {
      return ( editorCards && (
        <div className="document_editor_cards">
          <textarea
            name="title"
            className={"document_title_edit"}
            defaultValue={document.title}
            onChange={onChangeTitle}
          />
          <h1 className="document_title">{document.title}</h1>
          {editorCards?.map((card: CardModel) => (
            <Card key={card.id} card={card} className="card_document_editor" />
          ))}
        </div>
      ))
      
    } else {
      let selectedCardId=sessionStorage.getItem("selectedCard");
      let selectedCard=editorCards.find((card:CardModel)=>card.id===selectedCardId);
      return (
        <div className="cardById">
          <Card card={selectedCard!} className="selectedCardById" />
        </div>
      );
    }
  };
  return <div>{renderCards()}</div>;
};
