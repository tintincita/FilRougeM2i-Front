import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Container } from "../../components/container/container.component";
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

  const { data: document } = useQuery(
    "workspaces",
    () => getDocumentsByProjectId(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const { mutate: newDocumentById } = useMutation(newDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });

  function createDocument(e: any) {
    e.preventDefault();
    e.stopPropagation();
    newDocumentById(params.id!);
  }

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
    </div>
  );
};
