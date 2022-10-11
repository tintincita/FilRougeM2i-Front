import { TbBoxMultiple, TbFile } from "react-icons/tb";
import "./navbar.css"

interface NavProps {
  className?: string;
  id?: string;
}

export const NavBar: React.FC<NavProps> = ({ className,id }) => {

  function redirectOutliner(e: any) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "/outliner/" + id;
  }

  function redirectEditor(e: any) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "/editor/" + id;
  }

  return (
    <nav className={className}>
        <TbBoxMultiple className="icon_outliner" onClick={redirectOutliner}/>
        <TbFile className="icon_editor" onClick={redirectEditor}/>
    </nav>
  );
};
