import { movie } from "../dataTypes";
import { ToggleBookmarkIcon, ToggleIcon } from "./SVG";

export default function Carousel(Prop: {
  movies: movie[];
  toggleBookmark: (movie: movie) => void;
}) {
  return (
    <div>
      <div className=" pb-4">Trending</div>
      <div className=" grid grid-flow-col gap-4 pr-4 overflow-x-auto no-scrollbar">
        {Prop.movies.map((movie, ind) => (
          <div
            key={movie.title + ind}
            className=" w-60 h-36 tablet:w-[470px] tablet:h-fit"
          >
            <div className=" h-0 relative ">
              <div
                className=" absolute left-[80%] top-4 tablet:left-[90%]"
                onClick={() => {
                  Prop.toggleBookmark(movie);
                }}
              >
                <ToggleBookmarkIcon isBookmarked={movie.isBookmarked} />
              </div>
              <div className=" absolute top-24 pl-4 pb-4 tablet:top-48 tablet:pl-6 tablet:pb-6">
                <div className=" flex gap-3 text-xs font-light tablet:text-sm">
                  <span>{movie.year} &bull; </span>
                  <span className=" flex gap-1 pl-1">
                    {" "}
                    <ToggleIcon category={movie.category} /> {movie.category}{" "}
                    &bull;{" "}
                  </span>
                  <span>{movie.rating}</span>
                </div>
                <div className=" font-semibold tablet:text-2xl">
                  {movie.title}
                </div>
              </div>
            </div>
            <img
              className="rounded-md"
              src={movie.thumbnail.trending?.small}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
