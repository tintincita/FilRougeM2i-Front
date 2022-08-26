import { deleteCard } from "../../services/card.service";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";

export const Delete = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => {
        dispatch(deleteCard(id));
      }}
    >
      <AiOutlineDelete />
    </button>
  );
};
