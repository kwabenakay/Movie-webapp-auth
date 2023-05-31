import { useLocation, useNavigate } from "react-router-dom";

export default function Filter(Prop:{setSearch:React.Dispatch<React.SetStateAction<string>>}) {
  let loctation = useLocation();
  let navigate = useNavigate();
  let myString: string = loctation.pathname;
  let regex: RegExp = /\/([^/]+)$/;
  let match: RegExpMatchArray | null = myString.match(regex);
  let currentPage = match ? match[1] : "";
  function pageType() {
    switch (currentPage) {
      case "home": {
        return "Search for movies or TV series";
      }
      case "movies": {
        return "Search for movies";
      }
      case "tv-series": {
        return "Search for TV series";
      }
      case "bookmark": {
        return "Search for bookmarked shows";
      }
      default:
        return "";
    }
  }
  return (
    <div className=" text-white w-full flex gap-4 pt-3 pr-4 tablet:pr-6 mini-pc:pr-12">
      <div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.01" width="32" height="32" fill="black" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.08 21.2L27.6133 25.72C27.8657 25.9704 28.0077 26.3111 28.0077 26.6667C28.0077 27.0222 27.8657 27.363 27.6133 27.6133C27.363 27.8657 27.0222 28.0077 26.6667 28.0077C26.3111 28.0077 25.9704 27.8657 25.72 27.6133L21.2 23.08C19.3366 24.5426 17.0355 25.3363 14.6667 25.3333C8.77563 25.3333 4 20.5577 4 14.6667C4 8.77563 8.77563 4 14.6667 4C20.5577 4 25.3333 8.77563 25.3333 14.6667C25.3363 17.0355 24.5426 19.3366 23.08 21.2ZM14.6667 6.66667C10.2484 6.66667 6.66667 10.2484 6.66667 14.6667C6.66667 19.0849 10.2484 22.6667 14.6667 22.6667C19.0849 22.6667 22.6667 19.0849 22.6667 14.6667C22.6667 10.2484 19.0849 6.66667 14.6667 6.66667Z"
            fill="white"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder={pageType()}
        className=" bg-transparent outline-none w-full focus:border-b-2 focus:border-b-grey"
        onChange={(e) => {
          Prop.setSearch(e.target.value)
          if (currentPage !== "search") {
            navigate("/search");
          } else if (e.target.value.trim().length === 0 || !e.target.value) {
            navigate(-1);
          }
          console.log(e.target.value);
        }}
      />
    </div>
  );
}
