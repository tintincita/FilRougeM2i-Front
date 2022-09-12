import { NavBar } from "./navbar.component";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className="header">
      <h1 className="application_name">Ada</h1>
      <NavBar className={className} />
    </div>
  );
};
