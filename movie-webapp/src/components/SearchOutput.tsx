import { useEffect, useState } from "react";
import { movie } from "../dataTypes";
import MovieCard from "./MovieCard";

export default function SearchOutput(Prop: { searchValue: string }) {
  const [data, setData] = useState<movie[]>(
    JSON.parse(localStorage.getItem("data") || "[]")
  );
  const [searchOutput, setSearchOutput] = useState<movie[]>([]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    setSearchOutput(
      data.filter((movie) =>
        movie.title.toLowerCase().includes(Prop.searchValue.toLowerCase())
      )
    );
  }, [data]);

  useEffect(() => {
    setSearchOutput(
      data.filter((movie) =>
        movie.title.toLowerCase().includes(Prop.searchValue.toLowerCase())
      )
    );
  }, [Prop.searchValue]);

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

  return (
    <div className=" pr-4 tablet:pr-6 mini-pc:pr-12">
      <div className=" mb-6">
        Found {searchOutput.length} results for {"string input"}
      </div>
      <MovieCard movies={searchOutput} toggleBookmark={toggleBookmark} />
    </div>
  );
}
