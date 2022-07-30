import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import Card from "./components/Card";
import CardUser from "./components/CardUser";

function App() {
  const [username, setUsername] = useState<string>("");
  const [url, setUrl] = useState<string>(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  const [repos, setRepos] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSearch, setIsSearch] = useState<boolean>(false);

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

  const displayUsers: any = repos
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((repo: any, index: number) => {
      return (
        <div key={index}>
          <CardUser repo={repo} />
        </div>
      );
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetchRepos();
    setForcePage(1);
    changePage({ selected: 0 });
    setIsSearch(true);
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    fetchPulbicRepos();
    setForcePage(1);
    changePage({ selected: 0 });
    setUsername("");
    setUrl("");
    setIsSearch(false);
  };

  const fetchPulbicRepos = async () => {
    setIsLoading(true);
    await axios
      .get("https://api.github.com/repositories")
      .then((res) => {
        setRepos(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchRepos = async () => {
    setIsLoading(true);
    await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((res) => {
        setRepos(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
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
          <button
            disabled={!!!username}
            className="search-btn"
            onClick={handleSubmit}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      {!isSearch && <div className="flex-box">{displayPublicRepos}</div>}
      {isSearch && <div className="flex-box">{displayUsers}</div>}
      {
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
      }
    </div>
  );
}

export default App;
