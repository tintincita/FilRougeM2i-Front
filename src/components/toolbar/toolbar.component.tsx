import { AddButton } from "./buttons/addButton.component";
import { DeleteButton } from "./buttons/deleteButton.component";
import { EditButton } from "./buttons/editButton.component";

interface ToolBarProps {
  className: string;
  id: string;
}
export const ToolBar: React.FC<ToolBarProps> = ({ className, id }) => {
  return (
    <div className={"toolbar_" + className}>
      <AddButton id={id} />
      <DeleteButton />
      <EditButton />
    </div>
  );
};
