import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [url, setUrl] = useState<string>("https://api.github.com/repositories");
  const [repos, setRepos] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number>(1);

  const usersPerPage: number = 10;
  const pagesVisited: number = pageNumber * usersPerPage;

  const displayPublicRepos: any = repos
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((repo: any, index: number) => {
      return (
        <div key={index}>
          <Card repo={repo} />
        </div>
      );
    });

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
      {displayPublicRepos}
    </div>
  );
}

export default App;
