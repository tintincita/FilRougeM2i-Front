export default class DocumentModel {
  title: string;
  cards: string[];
  parentSpace: string;
  id:string;
  constructor(
    title: string = "",
    cards: string[] = [""],
    parentSpace: string = "",
    id:string = ""
  ) {
    this.title = title;
    this.cards = cards;
    this.parentSpace = parentSpace;
    this.id = id;
  }
}
