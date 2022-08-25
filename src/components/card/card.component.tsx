import CardModel from "../../models/card.model";
import { Update } from "./update.component";
import { Delete } from "./delete.component";
import { useAppDispatch } from "../../store/store";
import { updateCard } from "../../features/cards/cardsSlice";

const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {};

export const Card = ({ card }: { card: CardModel }) => {
  return (
    <div className="card">
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            defaultValue={card.title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <label>Content:</label>
          <input type="text" name="content" value={card.content} />
        </div>
        <div>
          <Update id={card.id} />
          <Delete id={card.id} />
        </div>
      </form>
    </div>
  );
};
