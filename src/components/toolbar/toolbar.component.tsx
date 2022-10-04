import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import { newCard } from "../../services/document.service";

interface ToolBarProps {
  className: string;
}
export const ToolBar: React.FC<ToolBarProps> = ({ className }) => {
  const documentId = "6315c7b206897a97f65ee180";
  const queryClient = useQueryClient();

  // let documentEditor = document.querySelector(".document_editor");
  // let documentTitleEdit = documentEditor?.getElementsByTagName("textarea")[0];
  // let documentTitle = documentEditor?.getElementsByTagName("h1")[0];

  const { mutate: newCardByID } = useMutation(newCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
    },
  });

  // add new card to document
  function addButtonOnClick() {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      sessionStorage.setItem("DeleteButton", "disabled");
    }
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
      // disabledEditCardandTitle();
    }
    newCardByID(documentId);
  }

  function deleteButtonOnClick(e: any) {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      sessionStorage.setItem("DeleteButton", "disabled");
    } else {
      sessionStorage.setItem("DeleteButton", "enabled");
    }
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
      sessionStorage.setItem("DeleteButton", "enabled");
    }
  }

  function editButtonOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
    } else {
      sessionStorage.setItem("EditButton", "enabled");
      sessionStorage.setItem("DeleteButton", "disabled");
    }
    queryClient.invalidateQueries("outlinerCards");
  }

  return (
    <div className="toolbar">
      <button onClick={addButtonOnClick} className="add_card">
        <AiOutlinePlus />
      </button>
      <button className="delete_card" onClick={deleteButtonOnClick}>
        <AiOutlineDelete />
      </button>
      <button className="edit_card" onClick={editButtonOnClick}>
        <FiEdit />
      </button>
    </div>
  );
};
