import { NavBar } from "../navbar/navbar.component";
import { MdLogin, MdLogout } from "react-icons/md";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className="header">
      <h1 className="application_name">Ada</h1>
      <NavBar className={className} />
      <a href="/outliner">
        <MdLogin className={className + "_login_icon"} />
      </a>
      <a href="/homepage">
        <MdLogout className={className + "_logout_icon"} />
      </a>
    </div>
  );
};
