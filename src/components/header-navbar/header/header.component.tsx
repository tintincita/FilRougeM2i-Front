import { NavBar } from "../navbar/navbar.component";
import { MdLogin, MdLogout } from "react-icons/md";
import "./header.css";

interface HeaderProps {
  className?: string;
  id?: string;
}

export const Header: React.FC<HeaderProps> = ({ className, id }) => {
  return (
    <div className="header">
      <h1 className="application_name">Ada</h1>
      <NavBar className={className} id={id} />
      <a href="/outliner">
        <MdLogin className={className + "_login_icon"} />
      </a>
      <a href="/homepage">
        <MdLogout className={className + "_logout_icon"} />
      </a>
    </div>
  );
};
