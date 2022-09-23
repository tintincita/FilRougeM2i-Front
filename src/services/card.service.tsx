import axios from "axios";
import { AppDispatch } from "../redux/store";
import API from "../config/config.json";
import { storeGetCardById } from "../redux/slices/cards.slice";

export function getCardById(
  id: string
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.get(`${API.api.getCardbyID}${id}`).then((res) => {
        dispatch(storeGetCardById(res.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}
