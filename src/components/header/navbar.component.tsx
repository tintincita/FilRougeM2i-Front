interface NavProps {
  className?: string;
}

export const NavBar: React.FC<NavProps> = ({ className }) => {
  return (
    <nav className={className}>
      <a className={className + "_editor"} href="/editor">
        Editor
      </a>
      <a className={className + "_outliner"} href="/outliner">
        Outliner
      </a>
    </nav>
  );
};
