import { useMutation, useQuery, useQueryClient } from "react-query";
import { Header } from "../../components/header-navbar/header/header.component";
import Workspace from "../../models/workspace.model";
import { getWorkspacesByUserId, newWorkspace } from "../../services/workspace.service";
import "./workspace.page.css";

export const WorkspacePage = () => {
  let userID = "6343ceada988d4eee609c818";
  const queryClient = useQueryClient();
  const { data: workspaces } = useQuery(
    "workspaces",
    () => getWorkspacesByUserId(userID),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  console.log(workspaces);

    const { mutate: newWorkspacebyID } = useMutation(newWorkspace, {
      onSuccess: () => {
       queryClient.invalidateQueries("workspaces");
      },
    });
  

 function createWorskpace(e:any) {
   e.preventDefault();
   e.stopPropagation();
    newWorkspacebyID(userID);
  }

  return (
    <div>
      <Header />
      <div className="workspace">
        <h1>Workspace Page</h1>
        <button onClick={createWorskpace}>Create Workspace</button>
        {workspaces?.map((workspace: Workspace) => (
          <div key={workspace._id}> {workspace._id} </div>
        ))}
      </div>
    </div>
  );
};
