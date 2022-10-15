import { FiEdit } from "react-icons/fi";
import { useQueryClient } from "react-query";
import "./buttons.css";

export const EditButton: React.FC = () => {
  const queryClient = useQueryClient();

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

    let editButton = document.getElementsByClassName(
      "edit_card"
    )[0] as HTMLButtonElement;
    let deleteButton = document.getElementsByClassName(
      "delete_card"
    )[0] as HTMLButtonElement;
  
    console.log("editButton", editButton);
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
      if (editButton) {
        editButton.style.color = "#131313";
      }
    } else {
      sessionStorage.setItem("EditButton", "enabled");
      if (editButton) {
        editButton.style.color = "rgba(123, 194, 252, 0.75)";
      }

      sessionStorage.setItem("DeleteButton", "disabled");
      if (deleteButton) {
        deleteButton.style.color = "#131313";
      }
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
