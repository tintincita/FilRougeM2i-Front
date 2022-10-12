import axios from "axios";
import API from "../config/config.json";


/**
 * Get all documents from the API, then filter them by the project ID.
 * @param {string} projectID - string
 * @returns An array of documents.
 */
export const getDocumentsByProjectId = async (projectID: string) => {
  const res = await axios.get(`${API.api.getAllDocuments}`);
  const documents = res.data.filter(
    (document: any) => document.project === projectID
  );
  return documents;
};

/**
 * This function creates a new document in the database and returns the data of the new document.
 * @param {string} projectID - string
 * @returns The response from the server.
 */
export const newDocument = async (projectID: string) => {
  const res = await axios.post(`${API.api.createDocument}`, {
    project: projectID,
    title: "New Document",
    description: "New Document Description",
  });
  return res.data;
};

/**
 * This function gets the outlinerCards from the document by the document's id.
 * @param {string} id - string
 * @returns An array of objects.
 */
export const getOutlinerCardsByDocumentById = async (id: string) => {
  const res = await axios.get(`${API.api.getDocumentByID}${id}`);
  return res.data.outlinerCards;
};

/**
 * This function gets the editorCards from the document by the document's id.
 * @param {string} id - string
 * @returns An array of objects.
 */
export const getEditorCardsByDocumentById = async (id: string) => {
  const res = await axios.get(`${API.api.getDocumentByID}${id}`);
  return res.data.editorCards;
};

/**
 * This function takes an id as a parameter, makes a request to the server, and returns the title of
 * the document with that id.
 * @param {string} id - string
 * @returns The title of the document.
 */
export const getTitleByDocumentById = async (id: string) => {
  const res = await axios.get(`${API.api.getDocumentByID}${id}`);
  return res.data.title;
};

/**
 * This function is used to update the editorCards array in the document with the id of updatedOrder.id
 * with the array of updatedOrder.cards
 * @param updatedOrder - { id: string; cards: string[]; }
 */
export const updateEditorCardsDocumentByID = async (updatedOrder: {
  id: string;
  cards: string[];
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${updatedOrder.id}`,
      data: {
        editorCards: updatedOrder.cards,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function is used to update the order of the cards in the outlinerCards array in the document
 * with the id of updatedOrder.id
 * @param updatedOrder  - { id: string; cards: string[]; }
 */
export const updateOutlinerCardsDocumentByID = async (updatedOrder: {
  id: string;
  cards: string[];
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${updatedOrder.id}`,
      data: {
        outlinerCards: updatedOrder.cards,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function takes an object with an id and a title, and updates the title of the document with the
 * matching id.
 * @param updatedTitle - {
 */
export const updateTitleDocumentById = async (updatedTitle: {
  Id: string;
  title: string;
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${updatedTitle.Id}`,
      data: {
        title: updatedTitle.title,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes an object with an Id and a description, and updates the description of the document with
 * the matching Id.
 * @param updatedDescription - {
 */
export const updateDescriptionDocumentById = async (updatedDescription: {
  Id: string;
  description: string;
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${updatedDescription.Id}`,
      data: {
        description: updatedDescription.description,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function deletes a document by its ID.
 * @param {string} documentID - string
 * @returns The response from the server.
 */
export const deleteDocumentById = async (documentID: string) => {
  const res = await axios.delete(`${API.api.deleteDocumentByID}/${documentID}`);
  return res.data;
};
