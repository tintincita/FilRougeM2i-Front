import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Container } from "../../components/container/container.component";
import { Footer } from "../../components/footer/footer.component";
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

  /* A hook that is used to fetch data of projects from the server. */
  const { data: projects } = useQuery(
    "projects",
    () => getProjectsByWorkspaceId(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  /* A hook that is used to create a new project. */
  const { mutate: newProjectById } = useMutation(newProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  /**
   * The function createProject calls the function newProjectById with
   * the id of the project as an argument.
   * @param {any} e - any - the event object
   */
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
        <button onClick={createProject}>Create Project</button>
        {projects?.map((project: ProjectModel) => (
          <Container entity={project} />
        ))}
      </div>
      <Footer entity="Projects" table={projects} />
    </div>
  );
};
