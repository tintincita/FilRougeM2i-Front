import axios from "axios";
import API from "../config/config.json";

export function getCardById(id: string): () => Promise<void> {
  return async () => {
    try {
      await axios.get(`${API.api.getCardbyID}${id}`).then((res) => {});
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteCard = async (id: string) => {
  const res = await axios.delete(`${API.api.deleteCardByID}${id}`);
  return res.data;
};

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
    })
      .then((res) => {
        console.log("carte modifiée");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
