import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState<string>("https://api.github.com/repositories");
  const [repos, setRepos] = useState<any[]>([]);

  const fetchRepos = async () => {
    await axios
      .get(url)
      .then((res) => {
        setRepos(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="container">
      <div className="header-bar">
        <h1>Listing Github Repos APP</h1>
      </div>
    </div>
  );
}

export default App;
