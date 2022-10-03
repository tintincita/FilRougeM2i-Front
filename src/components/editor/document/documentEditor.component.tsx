

import CardModel from "../../../models/card.model";
import DocumentModel from "../../../models/document.model";

import { Card } from "../../card/card.component";


import { updateTitleDocumentById } from "../../../services/document.service";

interface DocumentEditorProps {
  document: DocumentModel;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ document }) => {


  // let update = "";
  // const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   e.preventDefault();
  //   update = e.target.value;
  //  (updateTitleDocumentById(document.id, update));
  // };

  // const renderCards = () => {
  //   if (!Object.keys(card).includes("id")) {
  //     for (let i = 0; i < documents.length; i++) {
  //       if (document.id === documents[i].id) {
  //         const editorCards = documents[i].editorCards;
  //         return (
  //           <div className="document_editor_cards">
  //             <textarea
  //               name="title"
  //               className={"document_title_edit"}
  //               defaultValue={document.title}
  //               onChange={onChangeTitle}
  //             />
  //             <h1 className="document_title">{document.title}</h1>
  //             {editorCards?.map((card: CardModel) => (
  //               <Card
  //                 key={card.id}
  //                 card={card}
  //                 className="card_document_editor"
  //               />
  //             ))}
  //           </div>
  //         );
  //       }
  //     }
  //   } else {
  //     return (
  //       <div className="cardById">
  //         <Card card={card} className="selectedCardById" />
  //       </div>
  //     );
  //   }
  // };
  return <div>
    {/* {renderCards()} */}
    </div>;
};
