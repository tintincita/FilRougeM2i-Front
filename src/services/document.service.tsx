import axios from "axios";
import API from "../config/config.json";

export const getOutlinerCardsByDocumentById = async (id: string) => {
  const res = await axios.get(`${API.api.getDocumentByID}${id}`);
  return res.data.outlinerCards;
};

export const getEditorCardsByDocumentById = async (id: string) => {
  const res = await axios.get(`${API.api.getDocumentByID}${id}`);
  return res.data.editorCards;
};

export const newCard = async (id: string) => {
  const res = await axios({
    method: "post",
    url: `${API.api.createCard}`,
    data: { document: id, title: "Titre", content: "Contenu" },
  });
  return res.data;
};


export const updateEditorCardsDocumentByID = async (updatedOrder: {
  id: string;
  cards: string[];
}) => {
  try {
    await axios({
      method: "put",
      url: `${API.api.updateDocumentByID}${updatedOrder.id}`,
      data: {
        editorCards: updatedOrder.cards,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

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

