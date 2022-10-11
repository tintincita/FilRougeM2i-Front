import axios from "axios";
import API from "../config/config.json";

export const getWorkspacesByUserId = async (userID: string) => {
  const res = await axios.get(`${API.api.getAllWorkspace}`);
  const workspaces = res.data.filter(
    (workspace: any) => workspace.user === userID
  );
  return workspaces;
};

export const newWorkspace = async (userID: string) => {
  const res = await axios.post(`${API.api.createWorkspace}`, {
    user: userID,
    title: "New Workspace",
  });
  return res.data;
};

export const getWorkspaceById = async (workspaceID: string) => {
  const res = await axios.get(`${API.api.getWorkspaceByID}/${workspaceID}`);
  return res.data;
};

export const updateTitleWorkspaceById = async (update: {
  Id: string;
  title: string;
}) => {
  const res = await axios.put(
    `${API.api.updateWorkspaceByID}/${update.Id}`,
    {
      title: update.title,
    }
  );
  return res.data;
};

export const deleteWorkspaceById = async (workspaceID: string) => {
  const res = await axios.delete(
    `${API.api.deleteWorskspaceByID}/${workspaceID}`
  );
  return res.data;
}
