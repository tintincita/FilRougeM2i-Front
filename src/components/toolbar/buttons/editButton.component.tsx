import { FiEdit } from "react-icons/fi"
import { useQueryClient } from "react-query";

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
    <button className="edit_card" onClick={editButtonOnClick}>
    <FiEdit />
  </button>
  )
}  