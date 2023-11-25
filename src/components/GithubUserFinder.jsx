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
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      setUserRepos(response.data);
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
      <div className="main-top">
        <h2>Search GitHub Users</h2>
        <p>Enter GitHub username to search user profile:</p>
        <div className="search-section">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="search-btns">
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>

      {userData && (
        <div className="userData-section">
          <div className="main-data">
            <img src={userData.avatar_url} alt="User avatar" />
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
            <div className="user-follow">
              <p>Followers: {userData.followers}</p>
              <p>Following: {userData.following}</p>
            </div>
          </div>

          {userRepos.length > 0 && (
            <div className="user-repos">
              <h2>Recent Repositories</h2>
              <ul>
                {userRepos
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 10)
                  .map((repo) => (
                    <li key={repo.id}>
                      <div>
                        <h3>{repo.name}</h3>
                        {repo.description && <p>{repo.description}</p>}
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button>Go to repo</button>
                      </a>
                    </li>
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
