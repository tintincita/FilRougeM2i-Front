import axios from "axios";
import {
  addCard,
  getAllCards,
  getCardsByIdDocument,
} from "../features/cards/cardsSlice";
import { AppDispatch } from "../store/store";
import { deleteCardById } from "../features/cards/cardsSlice";

export function fetchAllCards() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios
        .get("http://localhost:3001/api/card/")
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
      await axios.delete(`http://localhost:3001/api/card/${id}`).then(() => {
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
        .get(`http://localhost:3001/api/document/${ids}`)
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
        .get(`http://localhost:3001/api/document/${ids}`)
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
        url: "http://localhost:3001/api/card/",
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
