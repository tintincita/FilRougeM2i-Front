import axios from "axios";
import API from "../config/config.json";


export function getCardById(
  id: string
): () => Promise<void> {
  return async () => {
    try {
      await axios.get(`${API.api.getCardbyID}${id}`).then((res) => {

      });
    } catch (error) {
      console.log(error);
    }
  };
}
