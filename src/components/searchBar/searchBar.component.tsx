interface SearchBarProps {
  modifySearchValue: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ modifySearchValue }) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        className="search"
        placeholder="Recherche..."
        onInput={(e: any) => modifySearchValue(e.target.value.toLowerCase())}
      />
    </div>
  );
};
