import CardModel from "../../models/card.model";
import { Update } from "./update.component";
import { Delete } from "./delete.component";
import { updateCardById } from "../../services/card.service";
import { AiOutlineEdit } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";

export const Card = ({ card }: { card: CardModel }) => {
  let title = "";
  let content = "";

  const dispatch = useAppDispatch();

  // Title changes
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    title = e.target.value;
  };

  // Content changes
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    content = e.target.value;
  };

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
          <input
            type="text"
            name="content"
            defaultValue={card.content}
            onChange={onChangeContent}
          />
        </div>
        <div>{card.id}</div>
        <div>
          <button
            onClick={() => {
              console.log(`Title : ${title}, Content : ${content}`);

              dispatch(
                updateCardById("630635b25e58b7f6c22f6041", title, content)
              );
            }}
          >
            <AiOutlineEdit />
          </button>
          <Delete id={card.id} />
        </div>
      </form>
    </div>
  );
};
