import { TbBoxMultiple, TbFile } from "react-icons/tb";
import "./navbar.css"

interface NavProps {
  className?: string;
}

export const NavBar: React.FC<NavProps> = ({ className }) => {
  return (
    <nav className={className}>
      <a className={className + "_outliner"} href="/outliner">
        <TbBoxMultiple className="icon_outliner" />
        <span>Outliner</span>
      </a>
      <a className={className + "_editor"} href="/editor">
        <TbFile className="icon_editor" />
        <span>Editor</span>
      </a>
    </nav>
  );
};
