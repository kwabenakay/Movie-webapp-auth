import { movie } from "../dataTypes";
import { ToggleBookmarkIcon, ToggleIcon } from "./SVG";

export default function MovieCard(Prop: {
  movies: movie[];
  toggleBookmark: (movie: movie) => void;
}) {
  return (
    <div className=" grid grid-cols-2 gap-4 tablet:grid-cols-3 tablet:gap-7 mini-pc:gap-10 mini-pc:grid-cols-4">
      {Prop.movies.map((movie, ind) => (
        <div key={movie.title + ind} className=" relative w-fit">
          <div
            className=" absolute left-[80%] top-[8%]"
            onClick={() => {
              Prop.toggleBookmark(movie);
            }}
          >
            <ToggleBookmarkIcon isBookmarked={movie.isBookmarked} />
          </div>
          <img
            className=" rounded-lg"
            src={movie.thumbnail.regular.small}
            alt={movie.title}
          />
          <div className=" text-xs flex items-center pt-1">
            <span>{movie.year} &bull; </span>
            <span className=" flex gap-1 pl-1">
              {" "}
              <ToggleIcon category={movie.category} /> {movie.category} &bull;{" "}
            </span>
            <span>{movie.rating}</span>
          </div>
          <div className=" tablet:text-xl">{movie.title}</div>
        </div>
      ))}
    </div>
  );
}
