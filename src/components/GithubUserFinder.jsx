import { useState } from "react";

function GithubUserFinder() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [Error, setError] = useState(null);

  return (
    <div className="main-section">
      <div>
        <h2>Search GitHub Users</h2>
        <p>Enter GitHub username to search user profile:</p>
      </div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
export default GithubUserFinder;
