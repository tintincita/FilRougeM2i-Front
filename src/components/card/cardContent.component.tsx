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
  return (
    <div className="card">
      <h2 className={className + "_title_view_document"} id={id}>
        {title}
      </h2>
      <p className={className + "_content_view_document"} id={id}>
        {content}
      </p>
    </div>
  );
};
