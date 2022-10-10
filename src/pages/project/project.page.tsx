import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header-navbar/header/header.component";
import ProjectModel from "../../models/project.model";
import { getProjectsByWorkspaceId } from "../../services/project.service";
import "./project.page.css";

export const ProjectPage = () => {
  const params = useParams()
  console.log(params.id)

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
  return (
    <div>
      <Header />
      <div className="project">
        <h1>Projects Page</h1>
        {projects?.map((project: ProjectModel) => <div>{project._id}</div>)}
      </div>
    </div>
  );
};
