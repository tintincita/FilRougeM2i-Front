import { NavBar } from "../navbar/navbar.component";
import {GoHome} from "react-icons/go";
import {GrLinkPrevious} from "react-icons/gr";
import "./header.css";
const logo = require("./logo.png");


interface HeaderProps {
  className?: string;
  id?: string;
}

export const Header: React.FC<HeaderProps> = ({ className, id }) => {

  function goToWorkspace() {
    window.location.href = "/workspace";
  }

  function previous () {
    window.history.back();
  }

  return (
    <div className="header">
      <img src={logo} alt="logo" className="header_logo" />
      <h1 className="application_name">Ada</h1>
      {className === "editor_nav" || className === "outliner_nav" ? (
        <NavBar className={className} id={id} />
      ) : null}
      <button className="goHome" onClick={goToWorkspace}>
        <GoHome />
      </button>
      <button className="previous" onClick={previous}>
        <GrLinkPrevious />
      </button>
    </div>
  );
};
