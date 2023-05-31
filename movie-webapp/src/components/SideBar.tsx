import { useLocation, useNavigate } from "react-router-dom";
import { BookmarkLogo, HomeLogo, Logo, MovieLogo, TvSeriesLogo } from "./SVG";
import {useSignOut} from 'react-auth-kit'

export default function SideBar() {
  const signOut = useSignOut()
  
  let loctation = useLocation();
  let navigate = useNavigate();
  const myString: string = loctation.pathname;
  const regex: RegExp = /\/([^/]+)$/;
  const match: RegExpMatchArray | null = myString.match(regex);
  let pageName = match ? match[1] : "";
  return (
    <div className=" mini-pc:fixed mini-pc:h-screen mini-pc:max-w-24 mini-pc:flex mini-pc:justify-between mini-pc:items-center">
      <div className=" flex justify-between p-4 bg-light-teal-blue tablet:rounded-xl tablet:mx-6 tablet:mt-4 tablet:h-20 tablet:items-center mini-pc:flex-col mini-pc:justify-normal mini-pc:gap-16 mini-pc:w-20 mini-pc:items-center mini-pc:h-[90%] mini-pc:ml-4 mini-pc:mr-0">
        <div onClick={() => navigate("/home")}>
          <Logo />
        </div>
        <div className=" flex gap-6  mini-pc:flex-col">
          <div onClick={() => navigate("/home")} className=" hover:cursor-pointer">
            <HomeLogo pageName={pageName} />
          </div>
          <div onClick={() => navigate("/movies")} className=" hover:cursor-pointer">
            <MovieLogo pageName={pageName} />
          </div>
          <div onClick={() => navigate("/tv-series")} className=" hover:cursor-pointer">
            <TvSeriesLogo pageName={pageName} />
          </div>
          <div onClick={() => navigate("/bookmark")} className=" hover:cursor-pointer">
            <BookmarkLogo pageName={pageName} />
          </div>
        </div>
        <div className=" h-full flex items-end" onClick={()=>{
          signOut()
          navigate("/login")
        }}>
          <img
            src="/profile.jpg"
            alt="profile"
            className=" mini-pc:justify-self-end hover:cursor-pointer rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
