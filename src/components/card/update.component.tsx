import { updateCardById } from "../../services/card.service";
import { AiOutlineEdit } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";

export const Update = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => {
        dispatch(updateCardById("630635b25e58b7f6c22f6041"));
        console.log("test delete");
      }}
    >
      <AiOutlineEdit />
    </button>
  );
};
