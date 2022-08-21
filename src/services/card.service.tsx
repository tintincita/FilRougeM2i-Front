import axios from "axios";
import { getAllCards } from "../features/cards/cardsSlice";
import { AppDispatch } from "../store/store";

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
