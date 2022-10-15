import { useMutation, useQuery, useQueryClient } from "react-query";
import { Header } from "../../components/header-navbar/header/header.component";
import { Container } from "../../components/container/container.component";
import WorkspaceModel from "../../models/workspace.model";
import {
  getWorkspacesByUserId,
  newWorkspace,
} from "../../services/workspace.service";
import "./workspace.page.css";
import { Footer } from "../../components/footer/footer.component";

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

  const { mutate: newWorkspacebyID } = useMutation(newWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });

  function createWorskpace(e: any) {
    e.preventDefault();
    e.stopPropagation();
    newWorkspacebyID(userID);
  }

  return (
    <div>
      <Header />
      <div className="workspaces">
        <h1>WORKSPACES</h1>
        <button onClick={createWorskpace}>Create Workspace</button>
        {workspaces?.map((workspace: WorkspaceModel) => (
          <Container entity={workspace} />
        ))}
      </div>
      <Footer entity="Workspaces" table={workspaces} />
    </div>
  );
};
