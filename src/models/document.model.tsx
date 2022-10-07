import CardModel from "./card.model";

export default class DocumentModel {
  title: string = "";
  editorCards: CardModel[] = [];
  outlinerCards: CardModel[] = [];
  parentSpace: string = "";
  _id: string = "";
}
