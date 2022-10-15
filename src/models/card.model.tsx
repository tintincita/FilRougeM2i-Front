export default class CardModel {
  title: string = "";
  content: string = "";
  document: string = "";
  _id: string = "";
  editor:
    | {
        style: {
          display: string;
        };
      }
    | undefined;
  outliner:
    | {
        style: {
          display: string;
        };
      }
    | undefined;
}
