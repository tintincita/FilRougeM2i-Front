import { Header } from "../../components/header-navbar/header/header.component";
import "./outliner.page.css";
import { SortableGrid } from "../../components/sortableGrid/sortableGrid.component";
import { ToolBar } from "../../components/toolbar/toolbar.component";
import { useQuery } from "react-query";
import { getOutlinerCardsByDocumentById } from "../../services/document.service";
import { SearchBar } from "../../components/searchBar/searchBar.component";
import { useState } from "react";
import CardModel from "../../models/card.model";

const Outliner = () => {
  const documentId = "633feb44a9367d5ae7c9c09a";

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

  const [search, setSearch] = useState<string>();
  

  function filterSearch(): CardModel[] {
    if (search) {
      return outlinerCards.filter((card: CardModel) => {
        return (
          card.content.toLowerCase().includes(search!) ||
          card.title.toLowerCase().includes(search!)
        );
      });
    } else return outlinerCards;
  }

  return (
    <div className="outliner-page">
      <Header className="outliner_nav"></Header>
      {outlinerCards && (
        <>
          <ToolBar className="outliner" id={documentId} />
          <div className="outliner">
          <SearchBar modifySearchValue={setSearch} />
          <div className="outliner_cards">
            <SortableGrid id={documentId} filter={filterSearch} />
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Outliner;
