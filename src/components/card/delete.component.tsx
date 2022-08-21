import { deleteCard } from "../../services/card.service";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";

export const Delete = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => {
        dispatch(deleteCard(id));
        console.log("test delete");
      }}
    >
      <AiOutlineDelete />
    </div>
  );
};
