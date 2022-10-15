import "./footer.css";

interface FooterProps {
  entity: string;
  table: any[];
  documentTitle?: string;
}

export const Footer: React.FC<FooterProps> = ({
  entity,
  table,
  documentTitle,
}) => {
  let numberOfWords = 0;

  function getNumberOfWords() {
    for (let i = 0; i < table?.length; i++) {
      numberOfWords += table[i].content.split("/[^\s\]/").length;
      numberOfWords += table[i].title.split("/[^\s\]/").length;
    }
    if(documentTitle) {
    numberOfWords += documentTitle!.split("/[^\s\]/").length;}
    return numberOfWords;
  }

  return (
    <div className="footer">
      <p className="number">
        {entity}: {table?.length}
      </p>
      {entity === "Editor Cards" ? (
        <p className="words"> Words : {getNumberOfWords()} </p>
      ) : null}
    </div>
  );
};
