import { Header } from "../../components/header-navbar/header/header.component";
import "./outliner.page.css";
import { SortableGrid } from "../../components/sortableGrid/sortableGrid.component";
import { ToolBar } from "../../components/toolbar/toolbar.component";
import { useQuery } from "react-query";
import { getOutlinerCardsByDocumentById } from "../../services/document.service";
import { SearchBar } from "../../components/searchBar/searchBar.component";
import { useState } from "react";
import CardModel from "../../models/card.model";
import { useParams } from "react-router-dom";

const Outliner = () => {
  
  const params = useParams();

 /* A hook that fetches data of outliner cards from the backend. */
  const { data: outlinerCards } = useQuery(
    "outlinerCards",
    () => getOutlinerCardsByDocumentById(params.id!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

/* A hook that sets the state of the search bar. */
  const [search, setSearch] = useState<string>();
  
/**
 * If the search variable is not empty, return the outlinerCards array filtered by the search variable.
 * If the search variable is empty, return the outlinerCards array.
 * @returns The filtered array of cards.
 */
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
      <Header className="outliner_nav" id={params.id}></Header>
      {outlinerCards && (
        <>
          <ToolBar className="outliner" id={params.id!} />
          <div className="outliner">
          <SearchBar modifySearchValue={setSearch} />
          <div className="outliner_cards">
            <SortableGrid id={params.id!} filter={filterSearch} />
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Outliner;
