import axios from "axios";
import {
  addCard,
  getAllCards,
  getCardsByIdDocument,
} from "../features/cards/cardsSlice";
import { AppDispatch } from "../store/store";
import { deleteCardById } from "../features/cards/cardsSlice";
import API from "../config/config.json"

export function fetchAllCards() {
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

export function deleteCard(id: string) {
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

export function fetchEditorCardsByIdDocument(ids: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios
        .get(`${API.api.getDocumentByID}${ids}`)
        .then((res) => res.data);
      dispatch(getCardsByIdDocument(response.editorCards));
      console.log(response.editorCards);
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchOutlinerCardsByIdDocument(ids: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios
        .get(`${API.api.getDocumentByID}${ids}`)
        .then((res) => res.data);
      dispatch(getCardsByIdDocument(response.outlinerCards));
      console.log(response.outlinerCards);
    } catch (error) {
      console.log(error);
    }
  };
}

export function NewCard(ids: string) {
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
