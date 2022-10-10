import { useQuery, useQueryClient } from "react-query";
import { getWorkspaceById } from "../../services/workspace.service";

interface WorkspaceProps {
  id: string;
}

export const Workspace: React.FC<WorkspaceProps> = ({id}) => {

  getWorkspaceById(id).then((res) => {
    console.log(res.data);
  });
  

  return (
    <div className="workspace">

    </div>
  )
};