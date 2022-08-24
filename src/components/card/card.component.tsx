import CardModel from "../../models/card.model";
import { Delete } from "./delete.component";

export const Card = ({ card }: { card: CardModel }) => {
  return (
    <div className="card">
      <h1>{card.title}</h1>
      <p>{card.content}</p>
      <p>{card.id}</p>
      <Delete id={card.id} />
    </div>
  );
};
