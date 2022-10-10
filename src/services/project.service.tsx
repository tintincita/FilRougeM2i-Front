import axios from "axios";
import API from "../config/config.json";

export const getProjectsByWorkspaceId = async (workspaceID: string) => {
  const res = await axios.get(`${API.api.getAllProjects}`);
  const workspaces = res.data.filter(
    (project: any) => project.workspace === workspaceID
  );
  console.log(workspaces);
  return workspaces;
};

export const newProject = async (workspaceID: string) => {
  const res = await axios.post(`${API.api.createProject}`, {
    workspace: workspaceID,
    title: "New Project",
  });
  return res.data;
}