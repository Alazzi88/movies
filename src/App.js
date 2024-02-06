import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MoviesList from "./components/MoviesList";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setmovies] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  // get all movies
  const getAllMovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=2aeabb633b5c9e4254abaf5dd51c8480&language=ar"
    );

    setmovies(res.data.results);
    setpageCount(res.data.total_pages);
  };
  // get current page
  const getPage = async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=2aeabb633b5c9e4254abaf5dd51c8480&language=ar&page=${page}`
    );
    setmovies(res.data.results);

    setpageCount(res.data.total_pages);
  };
  useEffect(() => {
    getAllMovies();
  }, []);

  // to search from api
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${word}&api_key=2aeabb633b5c9e4254abaf5dd51c8480&language=ar`
      );
      setmovies(res.data.results);
      setpageCount(res.data.total_pages);
    }
  };

  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesList
                  movies={movies}
                  getPage={getPage}
                  pageCount={pageCount}
                />
              }
            />

            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
