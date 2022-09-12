import { deleteCard } from "../../services/card.service";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../store/store";

interface DeleteProps {
  id: string;
  className?: string;
  idDocument: string;
}

export const Delete: React.FC<DeleteProps> = ({
  id,
  className,
  idDocument,
}) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={className + "_card"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteCard(id, idDocument));
      }}
    >
      <AiOutlineDelete />
    </button>
  );
};
