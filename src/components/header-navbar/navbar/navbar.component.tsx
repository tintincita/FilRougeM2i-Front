import { TbBoxMultiple, TbFile } from "react-icons/tb";
import "./navbar.css"

interface NavProps {
  className?: string;
  id?: string;
}

export const NavBar: React.FC<NavProps> = ({ className,id }) => {

  /**
   * When the user clicks on the button, redirect the user to the outliner page.
   * @param {any} e - any - the event that is being passed in
   */
  function redirectOutliner(e: any) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "/outliner/" + id;
  }

/**
 * The function is called when the user clicks on the button, the function
 * redirects the user to the editor page
 * @param {any} e - any - the event object
 */
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
