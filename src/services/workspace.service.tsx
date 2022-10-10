import axios from "axios";
import API from "../config/config.json";

export const getWorkspacesByUserId = async (userID: string) => {
  // recuperer tous les workspaces et filtretr par userID
  const res = await axios.get(`${API.api.getAllWorkspace}`);
  const workspaces = res.data.filter(
    (workspace: any) => workspace.user === userID
  );
  console.log(workspaces);
  return workspaces;
};
