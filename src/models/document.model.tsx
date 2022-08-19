export default class DocumentModel {
  title: string;
  cards: [string];
  parentSpace: string;
  constructor(
    title: string = "",
    cards: [string] = [""],
    parentSpace: string = ""
  ) {
    this.title = title;
    this.cards = cards;
    this.parentSpace = parentSpace;
  }
}
