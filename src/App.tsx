import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [username, setUsername] = useState<string>("");
  const [url, setUrl] = useState<string>(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  const [repos, setRepos] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const usersPerPage: number = 10;
  const pagesVisited: number = pageNumber * usersPerPage;

  const pageCount: number = Math.ceil(repos.length / usersPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setForcePage(selected);
    setPageNumber(selected);
  };

  const displayPublicRepos: any = repos
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((repo: any, index: number) => {
      return (
        <div key={index}>
          <Card repo={repo} />
        </div>
      );
    });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchRepos();
    setForcePage(1);
    changePage({ selected: 0 });
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setUsername("");
    setUrl("");
  };

  const fetchPulbicRepos = async () => {
    await axios
      .get("https://api.github.com/repositories")
      .then((res) => {
        setRepos(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchRepos = async () => {
    await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((res) => {
        setRepos(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchPulbicRepos();
  }, []);

  return (
    <div className="container">
      <div className="header-bar">
        <h1>Listing Github Repos APP</h1>
      </div>
      <form>
        <div className="search-bar">
          <h2>GitHub Username:</h2>
          <input
            className="input-repo"
            value={username}
            placeholder="Ex. Karn-P, microsoft, facebook "
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="search-btn" onClick={handleSubmit}>
            {isLoading ? "Searching..." : "Search"}
          </button>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      <div className="flex-box">{displayPublicRepos}</div>
      <ReactPaginate
        forcePage={forcePage}
        breakLabel=".."
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pg-btn"}
        activeClassName="pg-active"
        disabledClassName="pg-disable"
        marginPagesDisplayed={4}
      />
    </div>
  );
}

export default App;
