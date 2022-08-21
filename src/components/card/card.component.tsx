import CardModel from "../../models/card.model";

export const Card = ({ card }: { card: CardModel }) => {
  return (
    <div>
      <h1>{card.title}</h1>
      <p>{card.content}</p>
      <p>{card.id}</p>
    </div>
  );
};
