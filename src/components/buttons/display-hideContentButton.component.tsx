import { useQueryClient } from "react-query";
import { RiLayoutTopLine } from "react-icons/ri";
import { TbLayoutList } from "react-icons/tb";
import "./buttons.css";

export const DisplayHideContentButton: React.FC = () => {
  const queryClient = useQueryClient();


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
      sessionStorage.setItem("EditButton", "disabled");
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
        <RiLayoutTopLine />
      ) : (
        <TbLayoutList />
      )}
    </button>
  );
};
