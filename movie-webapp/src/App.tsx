import { useState } from "react";
import SideBar from "./components/SideBar";
import SearchOutput from "./components/SearchOutput";
import Home from "./pages/Home";
import Filter from "./components/Filter";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import { Navigate, Route, Routes } from "react-router-dom";
import Bookmark from "./pages/Bookmark";
import Login from "./pages/Login";
import { useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import {RequireAuth} from 'react-auth-kit'

function App() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className=" bg-teal-blue h-fit max-w-[1440px] mx-auto text-white mini-pc:flex">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {!(path.includes("login") || path.includes("signup")) && (
          <div className=" mini-pc:pr-24">
            <SideBar />
          </div>
        )}
        {!(path.includes("login") || path.includes("signup")) && (
          <div className=" pl-4 pb-6 tablet:pl-6 tablet:pb-8 mini-pc:pl-12 mini-pc:pb-14 mini-pc:w-[95%]">
            <Filter setSearch={setSearch}/>
            <Routes>
              <Route path="/home" element={<RequireAuth loginPath="/login"><Home/></RequireAuth>} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/movies" element={<RequireAuth loginPath="/login"><Movies /></RequireAuth>} />
              <Route path="/tv-series" element={<RequireAuth loginPath="/login"><TvSeries /></RequireAuth>} />
              <Route path="/bookmark" element={<RequireAuth loginPath="/login"><Bookmark /></RequireAuth>} />
              <Route path="/search" element={<RequireAuth loginPath="/login"><SearchOutput searchValue={search} /></RequireAuth>} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
