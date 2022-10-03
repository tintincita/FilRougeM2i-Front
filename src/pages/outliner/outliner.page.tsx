import { Header } from "../../components/header-navbar/header/header.component";
import "./outlinerpage.css";
import "../../components/header-navbar/header/styles/header.css";
import { SortableGrid } from "../../components/outliner/sortableGrid.component";
import { ToolBar } from "../../components/toolbar/toolbar.component";
import { useQuery } from "react-query";
import { getOutlinerCardsByDocumentById } from "../../services/document.service";

const Outliner = () => {
  const documentId = "6315c7b206897a97f65ee180";

  const { data: outlinerCards } = useQuery(
    "outlinerCards",
    () => getOutlinerCardsByDocumentById(documentId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <div className="outliner-page">
      <Header className="outliner_nav"></Header>
      {outlinerCards && (
        <ToolBar className="card_outliner" />
      )}
      <div className="outliner_cards">
        {outlinerCards && <SortableGrid />}
      </div>
    </div>
  );
};

export default Outliner;
