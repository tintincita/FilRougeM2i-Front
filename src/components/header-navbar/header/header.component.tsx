import { NavBar } from "../navbar/navbar.component";
import { MdLogin, MdLogout } from "react-icons/md";
import "./header.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
  id?: string;
}

export const Header: React.FC<HeaderProps> = ({ className, id }) => {
  return (
    <div className="header">
      <h1 className="application_name">Ada</h1>
      {className === "editor_nav" || className === "outliner_nav" ? (
        <NavBar className={className} id={id} />
      ) : null}
      {className === "homePage_nav" ? (
        <Link to="/workspace">
          <MdLogin className="login_icon" id="login_icon" />
        </Link>
      ) : (
        <Link to="/homepage">
          <MdLogout className="logout_icon" id="logout_icon" />
        </Link>
      )}
    </div>
  );
};
