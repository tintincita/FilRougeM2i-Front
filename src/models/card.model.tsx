export default class CardModel {
  title: string;
  content: string;
  document: string;
  parentCard: string;
  cardIndex: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  constructor(
    title: string = "",
    content: string = "",
    document: string = "",
    parentCard: string = "",
    cardIndex: number = 0,
    id: string = "",
    createAt: string = "",
    updatedAt: string = ""
  ) {
    this.title = title;
    this.content = content;
    this.document = document;
    this.parentCard = parentCard;
    this.cardIndex = cardIndex;
    this.id = id;
    this.createdAt = createAt;
    this.updatedAt = updatedAt;
  }
}
