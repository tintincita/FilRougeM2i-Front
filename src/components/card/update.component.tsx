import { updateCardById } from "../../services/card.service";
import { AiOutlineEdit } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";

export const Update = ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        dispatch(updateCardById(id, title, content));
      }}
    >
      <AiOutlineEdit />
    </button>
  );
};
