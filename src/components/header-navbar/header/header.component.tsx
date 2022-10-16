import { NavBar } from "../navbar/navbar.component";
import "./header.css";
const logo = require("./logo.png");

interface HeaderProps {
  className?: string;
  id?: string;
}

export const Header: React.FC<HeaderProps> = ({ className, id }) => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="header_logo" />
      <h1 className="application_name">Ada</h1>
      {className === "editor_nav" || className === "outliner_nav" ? (
        <NavBar className={className} id={id} />
      ) : null}
    </div>
  );
};
