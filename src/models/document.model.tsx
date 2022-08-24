export default class DocumentModel {
  title: string;
  editorCards: string[];
  outlinerCards: string[];
  parentSpace: string;
  id: string;
  constructor(
    title: string = "",
    editorCards: string[] = [""],
    outlinerCards: string[] = [""],
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
