import { useAppSelector } from "../../store/store";

import CardModel from "../../models/card.model";
import DocumentModel from "../../models/document.model";

import { Card } from "../card/card.component";

import { documentSelector } from "../../features/document/documentSlice";
import { cardSelector } from "../../features/cards/cardsSlice";

interface DocumentEditorProps {
  document: DocumentModel;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ document }) => {
  const documents = useAppSelector(documentSelector);
  let card = useAppSelector(cardSelector);

  const renderCards = () => {
    if (!Object.keys(card).includes("id")) {
      for (let i = 0; i < documents.length; i++) {
        if (document.id === documents[i].id) {
          const editorCards = documents[i].editorCards;
          return (
            <div className="document_editor_cards">
              <h1>{document.title}</h1>
              {editorCards?.map((card: CardModel) => (
                <Card
                  key={card.id}
                  card={card}
                  className="card_document_editor"
                />
              ))}
            </div>
          );
        }
      }
    } else {
      return (
        <div className="cardById">
          <Card card={card} className="selectedCardById" />
        </div>
      );
    }
  };
  return <div>{renderCards()}</div>;
};
