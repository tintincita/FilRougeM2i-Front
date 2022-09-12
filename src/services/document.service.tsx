import axios from "axios";
import API from "../config/config.json";
import { getDocumentById, updateDocumentById } from "../features/document/documentSlice";
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

export function updateDocumentByID(
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
      }).then((res) => {dispatch(updateDocumentById(res.data))});
    } catch (error) {
      console.log(error);
    }
  };
}