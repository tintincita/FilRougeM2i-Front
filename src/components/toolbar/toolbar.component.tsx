import { AiOutlinePlus } from "react-icons/ai";
import DocumentModel from "../../models/document.model";
import { useAppDispatch } from "../../redux/store";
import { NewCard } from "../../services/document.service";

interface ToolBarProps {
  document: DocumentModel;
}

export const ToolBar: React.FC<ToolBarProps> = ({ document }) => {
  console.log(document.id);
  const dispatch = useAppDispatch();
  return (
    <div className="toolbar">
      <button
        onClick={() => {
          dispatch(NewCard(document.id));
          console.log("new card");
        }}
        className="add_card"
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};
