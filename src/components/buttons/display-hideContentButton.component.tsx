import { useQueryClient } from "react-query";
import { RiLayoutTopLine } from "react-icons/ri";
import { TbLayoutList } from "react-icons/tb";
import "./buttons.css";

export const DisplayHideContentButton: React.FC = () => {
  const queryClient = useQueryClient();
  let editButton = document.getElementsByClassName(
    "edit_card"
  )[0] as HTMLButtonElement;
  let deleteButton = document.getElementsByClassName(
    "delete_card"
  )[0] as HTMLButtonElement;

  /**
   * It's a function that toggles the display of a component based on the value of a sessionStorage
   * variable.
   * @param e - {
   */
  function displayHideOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (
      !sessionStorage.getItem("Hide") ||
      sessionStorage.getItem("Hide") === "false"
    ) {
      sessionStorage.setItem("Hide", "true");
    } else {
      sessionStorage.setItem("Hide", "false");
    }

    if (
      sessionStorage.getItem("DeleteButton") === "enabled" ||
      sessionStorage.getItem("EditButton") === "enabled"
    ) {
      sessionStorage.setItem("DeleteButton", "disabled");
      deleteButton.style.color = "#131313";
      sessionStorage.setItem("EditButton", "disabled");
      editButton.style.color = "#131313";
    }
    queryClient.invalidateQueries("editorCards");
    queryClient.invalidateQueries("outlinerCards");
  }

  return (
    <button
      onClick={displayHideOnClick}
      className="display-hide-content-button"
    >
      {!sessionStorage.getItem("Hide") ||
      sessionStorage.getItem("Hide") === "false" ? (
        <TbLayoutList />
      ) : (
        <RiLayoutTopLine />
      )}
    </button>
  );
};
