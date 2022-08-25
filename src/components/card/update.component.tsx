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
      onClick={() => {
        console.log(`Title : ${title}, Content : ${content}`);

        dispatch(updateCardById("630635b25e58b7f6c22f6041", title, content));
      }}
    >
      <AiOutlineEdit />
    </button>
  );
};
