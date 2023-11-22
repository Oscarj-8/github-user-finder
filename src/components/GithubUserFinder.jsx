import { useState, useEffect } from "react";
import axios from "axios";

function GithubUserFinder() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError("User not found");
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserRepos();
    }
  }, [userData]);

  const fetchUserRepos = async () => {
    try {
      const responce = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setUserRepos(responce.data);
      setError(null);
    } catch (error) {
      setUserRepos([]);
      setError("No repositories found");
    }
  };

  const handleClear = () => {
    setUserData(null);
    setUsername("");
  };

  return (
    <div className="main-section">
      <div>
        <h2>Search GitHub Users</h2>
        <p>Enter GitHub username to search user profile:</p>
      </div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>
      {userData && (
        <div>
          <h3>{userData.name}</h3>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          {userRepos.length > 0 && (
            <div>
              <h3>Repositories:</h3>
              <ul>
                {userRepos.map((repo) => (
                  <li key={repo.id}>{repo.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
export default GithubUserFinder;
