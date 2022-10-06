import { AiOutlineDelete } from "react-icons/ai";
import "./buttons.css";

export const DeleteButton: React.FC = () => {
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
  
  return (
    <button className="delete_card" onClick={deleteButtonOnClick}>
      <AiOutlineDelete />
    </button>
  );
};
