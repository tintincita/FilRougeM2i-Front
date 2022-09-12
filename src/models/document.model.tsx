import CardModel from "./card.model";

export default class DocumentModel {
  getElementById(arg0: string) {
    throw new Error("Method not implemented.");
  }
  title: string;
  editorCards: CardModel[];
  outlinerCards: CardModel[];
  parentSpace: string;
  id: string;
  constructor(
    title: string = "",
    editorCards: CardModel[],
    outlinerCards: CardModel[],
    parentSpace: string = "",
    id: string = ""
  ) {
    this.title = title;
    this.editorCards = editorCards;
    this.outlinerCards = outlinerCards;
    this.parentSpace = parentSpace;
    this.id = id;
  }
}
