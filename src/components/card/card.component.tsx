import CardModel from "../../models/card.model";
import { Delete } from "./delete.component";
import { updateCardById } from "../../services/card.service";
import { useAppDispatch } from "../../store/store";

export const Card = ({ card }: { card: CardModel }) => {
  let update = {
    title: card.title,
    content: card.content
  }

  const dispatch = useAppDispatch();

  // Title changes
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    update.title = e.target.value;
    dispatch(updateCardById(card.id, update));
  };

  // Content changes
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    update.content = e.target.value;
    dispatch(updateCardById(card.id, update));
  };

  return (
    <div className="card">
      <form>
        <div>
          <input
            type="text"
            name="title"
            defaultValue={card.title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <input
            type="text"
            name="content"
            defaultValue={card.content}
            onChange={onChangeContent}
          />
        </div>
        <div>{card.id}</div>
        <div>
          <Delete id={card.id} />
        </div>
      </form>
    </div>
  );
};
