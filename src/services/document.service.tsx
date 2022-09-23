import axios from "axios";
import API from "../config/config.json";
import { editCardById } from "../features/cards/cardsSlice";
import {
  addCardToEditorCardsAndOutlinerCards,
  deleteEditorCardandOutlinerCardsById,
  getDocumentById,
  updateCardOfEditorCardsAndOutlinerCards,
  updateDocumentById,
  updateDocumentTitle,
} from "../features/document/documentSlice";
import { AppDispatch } from "../store/store";

export function fetchDocumentById(
  id: string
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios
        .get(`${API.api.getDocumentByID}${id}`)
        .then((res) => dispatch(getDocumentById(res.data)));
      console.log("get document by id");
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateEditorCardsDocumentByID(
  id: string,
  cardsEditor: string[]
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios({
        method: "put",
        url: `${API.api.updateDocumentByID}${id}`,
        data: {
          editorCards: cardsEditor,
        },
      }).then((res) => {
        dispatch(updateDocumentById(res.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateOutlinerCardsDocumentByID(
  id: string,
  cardsOutliner: string[]
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios({
        method: "put",
        url: `${API.api.updateDocumentByID}${id}`,
        data: {
          outlinerCards: cardsOutliner,
        },
      }).then((res) => {
        console.log("update outliner cards axios");
        dispatch(updateDocumentById(res.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTitleDocumentById(id: string, title: string) {
  return async (dispatch: AppDispatch) => {
    try {
      await axios({
        method: "put",
        url: `${API.api.updateDocumentByID}${id}`,
        data: {
          title: title,
        },
      }).then((res) => {
        dispatch(updateDocumentTitle(res.data));
      });
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
        dispatch(deleteEditorCardandOutlinerCardsById(id));
      });
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
          dispatch(addCardToEditorCardsAndOutlinerCards(res.data));
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
          dispatch(updateCardOfEditorCardsAndOutlinerCards(res.data));
          dispatch(editCardById(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
