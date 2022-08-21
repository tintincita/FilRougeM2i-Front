import axios from "axios";
import { getAllCards } from "../features/cards/cardsSlice";
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
