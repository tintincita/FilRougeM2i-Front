export default class CardModel {
  title: string;
  content: string;
  document: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  constructor(
    title: string = "",
    content: string = "",
    document: string = "",
    id: string = "",
    createAt: string = "",
    updatedAt: string = ""
  ) {
    this.title = title;
    this.content = content;
    this.document = document;
    this.id = id;
    this.createdAt = createAt;
    this.updatedAt = updatedAt;
  }
}
