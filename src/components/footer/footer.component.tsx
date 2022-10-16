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
    const getWords = /\s+/;
    for (let i = 0; i < table?.length; i++) {
      numberOfWords += table[i].content.trim().split(getWords).length;
      numberOfWords += table[i].title.trim().split(getWords).length;
    }
    if (documentTitle) {
      numberOfWords += documentTitle!.trim().split(getWords).length;
    }
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
