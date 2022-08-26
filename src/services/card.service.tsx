import axios from "axios";
import {
  addCard,
  getAllCards,
  getCardsByDocumentId,
  updateCard,
} from "../features/cards/cardsSlice";
import { AppDispatch } from "../store/store";
import { deleteCardById } from "../features/cards/cardsSlice";
import API from "../config/config.json";

/**
 * This function is an async function that takes a dispatch function as an argument and returns a
 * function that makes an API call and dispatches the response to the reducer.
 * @returns {Function} - A function that makes an API call and dispatches the response to the reducer.
 */
export function fetchAllCards(): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios
        .get(API.api.getAllCards)
        .then((res) => res.data);
      dispatch(getAllCards(response));
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * It's an async function that takes an id as a parameter, and returns a function that takes a dispatch
 * function as a parameter, and returns a promise that deletes a card from the database, and then
 * dispatches an action to delete the card from the redux store.
 * @param {string} id - string
 * @returns The return type is a function that takes a dispatch function as an argument.
 */
export function deleteCard(
  id: string
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`${API.api.deleteCardByID}${id}`).then(() => {
        dispatch(deleteCardById(id));
        console.log("test delete axios");
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * It's a function that takes an id as a parameter, and returns a function that takes a dispatch
 * function as a parameter, and returns a promise that dispatches a function that takes the response as
 * a parameter.
 * @param {string} ids - string
 * @returns The return type is a function that takes a dispatch function as an argument.
 *
 */
export function fetchEditorCardsByIdDocument(
  ids: string
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios
        .get(`${API.api.getDocumentByID}${ids}`)
        .then((res) => res.data);
      dispatch(getCardsByDocumentId(response.editorCards));
      console.log(response.editorCards);
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * It's a function that takes a string as an argument, and returns a function that takes a dispatch
 * function as an argument, and returns a promise that takes a response as an argument, and returns a
 * dispatch function that takes a response as an argument, and returns a console.log of the response.
 * @param {string} ids - string
 * @returns The return type is a function that takes a dispatch function as an argument.
 */
export function fetchOutlinerCardsByIdDocument(
  ids: string
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios
        .get(`${API.api.getDocumentByID}${ids}`)
        .then((res) => res.data);
      dispatch(getCardsByDocumentId(response.outlinerCards));
      console.log(response.outlinerCards);
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * It takes a string as an argument, makes a post request to an API, and then dispatches an action to
 * the reducer.
 * @param {string} ids - string
 * @returns a function that returns a promise.
 */
export function NewCard(ids: string): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios({
        method: "post",
        url: API.api.createCard,
        data: { document: ids },
      })
        .then((res) => {
          dispatch(addCard(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateCardById(
  id: string,
  update: { title: string; content: string }
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios({
        method: "put",
        url: `${API.api.updateCardbyID}${id}`,
        data: {
          title: update.title,
          content: update.content,
        },
      })
        .then((res) => {
          dispatch(updateCard(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
