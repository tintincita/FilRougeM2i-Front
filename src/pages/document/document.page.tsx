import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header-navbar/header/header.component";
import "./document.page.css";

export const DocumentPage = () => {
  const params = useParams();
  console.log(params.id);
  const queryClient = useQueryClient();
  
  const { data: document } = useQuery(
    "workspaces",
    () => getDocumentByProjectId(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  return (
    <div>
      <Header />
      <div className="document">
        <h1>Documents Page</h1>
      </div>
    </div>
  );
};
function getDocumentByProjectId(arg0: string): any {
  throw new Error("Function not implemented.");
}

