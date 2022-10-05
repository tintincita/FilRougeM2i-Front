interface CardContentProps {
  title: string;
  content: string;
  id: string;
  className: string;
}
export const CardContent: React.FC<CardContentProps> = ({
  title,
  content,
  id,
  className,
}) => {
  
  function displayHideContent() {
    if (
      !sessionStorage.getItem("Hide") ||
      sessionStorage.getItem("Hide") === "false" ||
      className === "card_document_editor"
    ) {
      return (
        <p className={className + "_content_view_document"} id={id}>
          {content}
        </p>
      );
    }
  }

  return (
    <>
      <h2 className={className + "_title_view_document"} id={id}>
        {title}
      </h2>
      <> {displayHideContent()}</>
    </>
  );
};
