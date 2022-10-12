import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Container } from "../../components/container/container.component";
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header-navbar/header/header.component";
import DocumentModel from "../../models/document.model";
import {
  getDocumentsByProjectId,
  newDocument,
} from "../../services/document.service";
import "./document.page.css";

export const DocumentPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  /* A query hook that is used to fetch the documents. */
  const { data: document } = useQuery(
    "documents",
    () => getDocumentsByProjectId(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  /* A mutation hook that is used to create a new document. */
  const { mutate: newDocumentById } = useMutation(newDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries("documents");
    },
  });

  /**
   * This function creates a new document by id.
   * @param e - The event that is triggered when the button is clicked.
   * @returns - A new document.
   */
  function createDocument(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
    newDocumentById(params.id!);
  }

  console.log(document);

  return (
    <div>
      <Header />

      <div className="document">
        <h1>DOCUMENTS</h1>
        <button onClick={createDocument}>Create Document</button>
        {document?.map((document: DocumentModel) => (
          <Container entity={document} />
        ))}
      </div>
      <Footer entity="Documents" table={document} />
    </div>
  );
};
