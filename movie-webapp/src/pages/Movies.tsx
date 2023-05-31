import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { movie } from "../dataTypes";

export default function Movies() {
  const [data, setData] = useState<movie[]>(
    JSON.parse(localStorage.getItem("data") || "[]")
  );
  const [movies, setMovies] = useState<movie[]>([]);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    setMovies(data.filter((movie) => movie.category === "Movie"));
  }, [data]);

  function toggleBookmark(movie: movie) {
    let output = data.map((film) => {
      if (movie.title === film.title && movie.year === film.year) {
        let temp = { ...film };
        temp.isBookmarked = !film.isBookmarked;
        return temp;
      }
      return film;
    });
    setData([...output]);
  }
  return data.length === 0 ? (
    <div className=" text-4xl mt-5">Retry Login</div>
  ) : (
    <div className=" mt-6">
      <div className=" pr-4 tablet:pr-6 mini-pc:pr-12">
        <div className="py-6 mini-pc:text-2xl">Movies</div>
        <MovieCard movies={movies} toggleBookmark={toggleBookmark} />
      </div>
    </div>
  );
}
