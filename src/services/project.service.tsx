import axios from "axios";
import API from "../config/config.json";

/**
 * It takes a workspaceID as a parameter, then it makes a GET request to the API, then it filters the
 * response data by the workspaceID, then it returns the filtered data.
 * @param {string} workspaceID - string
 * @returns An array of objects.
 */
export const getProjectsByWorkspaceId = async (workspaceID: string) => {
  const res = await axios.get(`${API.api.getAllProjects}`);
  const workspaces = res.data.filter(
    (project: any) => project.workspace === workspaceID
  );
  return workspaces;
};


/**
 * This function creates a new project in the database and returns the new project's data.
 * @param {string} workspaceID - string
 * @returns The response from the server.
 */
export const newProject = async (workspaceID: string) => {
  const res = await axios.post(`${API.api.createProject}`, {
    workspace: workspaceID,
    title: "New Project",
    description: "New Project Description",
  });
  return res.data;
};

/**
 * This function takes an object with an Id and a title, and updates the title of the project with the
 * given Id.
 * @param update - {
 * @returns The response from the server.
 */
export const updateProjectTitleById = async (update: {
  Id: string;
  title: string;
}) => {
  const res = await axios.put(`${API.api.updateProjectByID}/${update.Id}`, {
    title: update.title,
  });
  return res.data;
};

/**
 * This function deletes a project by its ID.
 * @param {string} projectID - string
 * @returns The response from the server.
 */
export const deleteProjectById = async (projectID: string) => {
  const res = await axios.delete(`${API.api.deleteProjectByID}/${projectID}`);
  return res.data;
};
