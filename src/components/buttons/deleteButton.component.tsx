import { AiOutlineDelete } from "react-icons/ai";
import "./buttons.css";

export const DeleteButton: React.FC = () => {
  let deleteButton =document.getElementsByClassName("delete_card")[0] as HTMLButtonElement;
  let editButton =document.getElementsByClassName("edit_card")[0] as HTMLButtonElement;
  /**
   * If the delete button is enabled, disable it. If the delete button is disabled, enable it. If the
   * edit button is enabled, disable it and enable the delete button.
   * @param {any} e - any - the event that is triggered when the button is clicked
   */
  function deleteButtonOnClick(e: any) {
    if (sessionStorage.getItem("DeleteButton") === "enabled") {
      sessionStorage.setItem("DeleteButton", "disabled");
      deleteButton.style.color="#131313";
    } else {
      sessionStorage.setItem("DeleteButton", "enabled");
      deleteButton.style.color="rgba(123, 194, 252, 0.75)";
    }
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
      editButton.style.color="#131313";
      sessionStorage.setItem("DeleteButton", "enabled");
      deleteButton.style.color="rgba(123, 194, 252, 0.75)";
    }
  }
  
  return (
    <button className="delete_card" onClick={deleteButtonOnClick}>
      <AiOutlineDelete />
    </button>
  );
};
