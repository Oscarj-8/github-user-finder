import github from "../assets/github.png";

function Header() {
  return (
    <div className="header">
      <img src={github} alt="Github icon" />
      <h1>GitHub User Finder</h1>
    </div>
  );
}
export default Header;
