import axios from "axios";
import API from "../config/config.json";

/**
 * Get all workspaces from the API, then filter them by the userID passed in as an argument.
 * @param {string} userID - string
 * @returns An array of objects.
 */
export const getWorkspacesByUserId = async (userID: string) => {
  const res = await axios.get(`${API.api.getAllWorkspace}`);
  const workspaces = res.data.filter(
    (workspace: any) => workspace.user === userID
  );
  return workspaces;
};

/**
 * This function creates a new workspace for a user and returns the new workspace's data.
 * @param {string} userID - string
 * @returns The response from the server.
 */
export const newWorkspace = async (userID: string) => {
  const res = await axios.post(`${API.api.createWorkspace}`, {
    user: userID,
    title: "New Workspace",
    description: "New Workspace Description",
  });
  return res.data;
};

/**
 * This function is used to get a workspace by its ID.
 * @param {string} workspaceID - string
 * @returns An object with a data property that contains the workspace object.
 */
export const getWorkspaceById = async (workspaceID: string) => {
  const res = await axios.get(`${API.api.getWorkspaceByID}/${workspaceID}`);
  return res.data;
};

/**
 * This function updates the title of a workspace by its ID.
 * @param update - {
 * @returns The response from the server.
 */
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


/**
 * This function updates the description of a workspace by its ID.
 * @param update - {
 * @returns The response from the server.
 */
export const updateDescriptionWorkspaceById = async (update: {  
  Id: string;
  description: string;
}) => {
  const res = await axios.put(
    `${API.api.updateWorkspaceByID}/${update.Id}`,
    { description: update.description }
  );
  return res.data;
};


/**
 * This function deletes a workspace by its ID.
 * @param {string} workspaceID - string
 * @returns The response from the server. 
 * */
export const deleteWorkspaceById = async (workspaceID: string) => {
  const res = await axios.delete(
    `${API.api.deleteWorskspaceByID}/${workspaceID}`
  );
  return res.data;
}
