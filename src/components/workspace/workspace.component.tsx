import { useMutation, useQueryClient } from "react-query";
import WorkspaceModel from "../../models/workspace.model";
import { updateTitleWorkspaceById } from "../../services/workspace.service";

interface WorkspaceProps {
  workspace: WorkspaceModel;
}

export const Workspace: React.FC<WorkspaceProps> = ({ workspace }) => {
  const queryClient = useQueryClient();

  const { mutate: updateTitle } = useMutation(updateTitleWorkspaceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });
  let update = {
    workspaceId: workspace._id,
    title: workspace.title,
  };
  function updateTitleWorkspace(e: any) {
    e.preventDefault();
    e.stopPropagation();
    update.title = e.target.value;
    updateTitle(update);
  }
  return (
    <div className="workspace">
      <h2> {workspace.title}</h2>
      <input
        type="text"
        defaultValue={workspace.title}
        onChange={updateTitleWorkspace}
      ></input>
    </div>
  );
};
