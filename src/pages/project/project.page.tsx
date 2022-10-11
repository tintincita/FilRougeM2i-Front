import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Container } from "../../components/container/container.component";
import { Header } from "../../components/header-navbar/header/header.component";
import ProjectModel from "../../models/project.model";
import {
  getProjectsByWorkspaceId,
  newProject,
} from "../../services/project.service";
import "./project.page.css";

export const ProjectPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  let userID = "6343ceada988d4eee609c818";
  // const queryClient = useQueryClient();
  const { data: projects } = useQuery(
    "workspaces",
    () => getProjectsByWorkspaceId(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const { mutate: newProjectById } = useMutation(newProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });

  function createProject(e: any) {
    e.preventDefault();
    e.stopPropagation();
    newProjectById(params.id!);
  }

  return (
    <div>
      <Header />
      <div className="project">
        <h1>PROJECTS</h1>
        <button onClick={createProject}>Create Workspace</button>
        {projects?.map((project: ProjectModel) => (
          <Container entity={project} />
       ))} 
      </div>
    </div>
  );
};
