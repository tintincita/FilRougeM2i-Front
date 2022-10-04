import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import { newCard } from "../../services/card.service";

interface ToolBarProps {
  className: string;
  id: string;
}
export const ToolBar: React.FC<ToolBarProps> = ({ className, id}) => {
  const queryClient = useQueryClient();

  /* A hook that is used to add a card. */
  const { mutate: newCardByID } = useMutation(newCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("outlinerCards");
      queryClient.invalidateQueries("editorCards");
    },
  });
 
/**
 * If the delete button is enabled, disable it. If the edit button is enabled, disable it. Create a new
 * card.
 */
  function addButtonOnClick() {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      sessionStorage.setItem("DeleteButton", "disabled");
    }
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
    }
    newCardByID(id);
  }

  /**
   * If the delete button is enabled, disable it. If the delete button is disabled, enable it. If the
   * edit button is enabled, disable it and enable the delete button.
   * @param {any} e - any - the event that is triggered when the button is clicked
   */
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

  /** 
   *  If the edit button is enabled, disable it. If the edit button is disabled, enable it. If the
   * delete button is enabled, disable it and enable the edit button.
   * @param {any} e - any - the event that is triggered when the button is clicked
   *  */
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
    queryClient.invalidateQueries("editorCards");
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
