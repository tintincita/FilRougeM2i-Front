import { FiEdit } from "react-icons/fi";
import { useQueryClient } from "react-query";
import "./buttons.css";

export const EditButton: React.FC = () => {
  const queryClient = useQueryClient();
  let editButton = document.getElementsByClassName(
    "edit_card"
  )[0] as HTMLButtonElement;
  let deleteButton = document.getElementsByClassName(
    "delete_card"
  )[0] as HTMLButtonElement;
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
      editButton.style.color = "#131313";
    } else {
      sessionStorage.setItem("EditButton", "enabled");
      editButton.style.color = "rgba(123, 194, 252, 0.75)";

      sessionStorage.setItem("DeleteButton", "disabled");
      deleteButton.style.color = "#131313";
    }
    queryClient.invalidateQueries("outlinerCards");
    queryClient.invalidateQueries("editorCards");
  }

  return (
    <button className="edit_card" onClick={editButtonOnClick}>
      <FiEdit />
    </button>
  );
};
