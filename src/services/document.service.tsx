import axios from "axios";
import API from "../config/config.json";

export const getOutlinerCardsByDocumentById = async (id: string) => {
  const res = await axios.get(`${API.api.getDocumentByID}${id}`);
  return res.data.outlinerCards;
};

export const newCard = async (id: string) => {
  const res = await axios({
    method: "post",
    url: `${API.api.createCard}`,
    data: { document: id, title: "Titre", content: "Contenu" },
  });
  return res.data;
};

export const deleteCard = async (id: string) => {
  const res = await axios.delete(`${API.api.deleteCardByID}${id}`);
  console.log(res.data)
  return res.data;
};

export function updateEditorCardsDocumentByID(
  id: string,
  cardsEditor: string[]
): () => Promise<void> {
  return async () => {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${id}`,
      data: {
        editorCards: cardsEditor,
      },
    });
  };
}

export const updateOutlinerCardsDocumentByID = async (updatedOrder: {
  id: string;
  cards: string[];
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${updatedOrder.id}`,
      data: {
        outlinerCards: updatedOrder.cards,
      },
    }).then(() => {
      console.log("updated");
    });
  } catch (error) {
    console.log(error);
  }
};

export function updateTitleDocumentById(id: string, title: string) {
  return async () => {
    try {
      await axios({
        method: "put",
        url: `${API.api.updateDocumentByID}${id}`,
        data: {
          title: title,
        },
      }).then((res) => {});
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateCardById(
  id: string,
  update: { title: string; content: string }
): () => Promise<void> {
  return async () => {
    try {
      await axios({
        method: "put",
        url: `${API.api.updateCardbyID}${id}`,
        data: {
          title: update.title,
          content: update.content,
        },
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
