import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";
import { deleteCard } from "../../services/document.service";

interface DeleteProps {
  id: string;
  className?: string;
}

export const Delete: React.FC<DeleteProps> = ({ id, className }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={className + "_card"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteCard(id));
      }}
    >
      <AiOutlineDelete />
    </button>
  );
};
