import { AddButton } from "../buttons/addButton.component";
import { DeleteButton } from "../buttons/deleteButton.component";
import { DisplayHideContentButton } from "../buttons/display-hideContentButton.component";
import { EditButton } from "../buttons/editButton.component";
import "./toolbar.css";

interface ToolBarProps {
  className: string;
  id: string;
}
sessionStorage.setItem("EditButton", "disabled");
sessionStorage.setItem("DeleteButton", "disabled");
export const ToolBar: React.FC<ToolBarProps> = ({ className, id }) => {
  return (
    <div className={"toolbar_" + className}>
      <AddButton id={id} />
      <DeleteButton />
      <EditButton />
      <DisplayHideContentButton />
    </div>
  );
};
