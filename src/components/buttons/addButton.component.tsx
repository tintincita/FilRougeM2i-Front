import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { newCard } from "../../services/card.service";
import "./buttons.css";

interface AddButtonProps {
  id: string;
}
export const AddButton: React.FC<AddButtonProps> = ({ id }) => {
  const queryClient = useQueryClient();
  let editButton = document.getElementsByClassName(
    "edit_card"
  )[0] as HTMLButtonElement;
  let deleteButton = document.getElementsByClassName(
    "delete_card"
  )[0] as HTMLButtonElement;

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
      deleteButton.style.color = "#131313";
    }
    if (sessionStorage.getItem("EditButton") === "enabled") {
      sessionStorage.setItem("EditButton", "disabled");
      editButton.style.color = "#131313";
    }
    newCardByID(id);
  }

  return (
    <button onClick={addButtonOnClick} className="add_card">
      <AiOutlinePlus />
    </button>
  );
};
