import { useQueryClient } from "react-query";
import { RiLayoutTopLine } from "react-icons/ri";
import { TbLayoutList } from "react-icons/tb";

export const DisplayHideContentButton: React.FC = () => {
  const queryClient = useQueryClient();

  function displayHideOnClick(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (
      sessionStorage.getItem("Hide") === "false" ||
      !sessionStorage.getItem("Hide")
    ) {
      sessionStorage.setItem("Hide", "true");
    }
    if (
      sessionStorage.getItem("DeleteButton") === "enabled" ||
      sessionStorage.getItem("EditButton") === "enabled"
    ) {
      sessionStorage.setItem("DeleteButton", "disabled");
      sessionStorage.setItem("EditButton", "disabled");
    } else {
      sessionStorage.setItem("Hide", "false");
    }
    queryClient.invalidateQueries("outlinerCards");
    queryClient.invalidateQueries("editorCards");
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
