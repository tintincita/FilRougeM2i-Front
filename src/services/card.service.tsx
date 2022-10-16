import axios from "axios";
import API from "../config/config.json";

/** This function takes an id as a parameter, makes a post request to the server, and returns the content of
 * the card with that id.
 * @param {string} id - string
 * @returns The content of the card.
 */
export const newCard = async (id: string) => {
  const res = await axios({
    method: "post",
    url: `${API.api.createCard}`,
    data: {
      document: id,
      title: "Title",
      content: "",
      editor: {
        style: {
          display: "block",
        },
      },
      outliner: {
        style: {
          display: "block",
        },
      },
    },
  });
  return res.data;
};

/**
 *  This function get a card by its id.
 * @param id - string
 */
export function getCardById(id: string): () => Promise<void> {
  return async () => {
    try {
      await axios.get(`${API.api.getCardbyID}${id}`);
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * This function takes an id as a parameter and returns a promise that resolves to the data returned by
 * the axios delete request.
 * @param {string} id - string
 * @returns The response from the server.
 */
export const deleteCard = async (id: string) => {
  const res = await axios.delete(`${API.api.deleteCardByID}${id}`);
  return res.data;
};

/**
 * It's a function that updates a card in a database.
 * @param update - { id: string; title: string; content: string; }
 */
export const updateCardById = async (update: {
  id: string;
  title: string;
  content: string;
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateCardbyID}${update.id}`,
      data: {
        title: update.title,
        content: update.content,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function is used to update the display property of the editor and outliner components of a card
 * by its id.
 * @param update - {
 */
export const updateDisplayCardById = async (update: {
  id: string;
  editor: string;
  outliner: string;
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateCardbyID}${update.id}`,
      data: {
        editor: {
          style: {
            display: update.editor,
          },
        },
        outliner: {
          style: {
            display: update.outliner,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
