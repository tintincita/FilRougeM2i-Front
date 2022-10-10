import { useQuery } from "react-query";
import { Header } from "../../components/header-navbar/header/header.component";
import Workspace from "../../models/workspace.model";
import { getWorkspacesByUserId } from "../../services/workspace.service";
import "./workspace.page.css";

export const WorkspacePage = () => {
  let userID = "6343050158356fb9e1d63cd5";

  const { data: workspaces } = useQuery(
    "workspace",
    () => getWorkspacesByUserId(userID),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  console.log(workspaces);

  return (
    <div>
      <Header />
      <div className="workspace">
        <h1>Workspace Page</h1>
        {workspaces?.map((workspace: Workspace) => (
          <div key={workspace._id}> {workspace._id} </div>
        ))}
      </div>
    </div>
  );
};
