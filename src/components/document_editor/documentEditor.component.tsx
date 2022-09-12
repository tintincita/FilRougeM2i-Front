import { useAppSelector } from "../../store/store";
import CardModel from "../../models/card.model";
import { Card } from "../card/card.component";
import DocumentModel from "../../models/document.model";
import { documentSelector } from "../../features/document/documentSlice";

interface DocumentEditorProps {
  document: DocumentModel;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ document }) => {
  const documents = useAppSelector(documentSelector);

  const renderCards = () => {
    for (let i = 0; i < documents.length; i++) {
      if (document.id === documents[i].id) {
        const editorCards = documents[i].editorCards;
        return editorCards?.map((card: CardModel) => (
          <Card
            key={card.id}
            card={card}
            idDocument={document.id}
            className="card_document_editor"
          />
        ));
      }
    }
  };
  return (
    <div className="document_editor_cards">
      <h1>{document.title}</h1>
      {renderCards()}
    </div>
  );
};
