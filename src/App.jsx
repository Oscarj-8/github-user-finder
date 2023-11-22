import "./App.css";
import GithubUserFinder from "./components/GithubUserFinder";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <GithubUserFinder />
    </div>
  );
}

export default App;
