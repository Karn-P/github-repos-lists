import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [url, setUrl] = useState<string>("https://api.github.com/repositories");
  const [repos, setRepos] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [forcePage, setForcePage] = useState<number>(1);

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
