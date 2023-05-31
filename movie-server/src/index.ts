import express, { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import bodyParser from "body-parser";
import { DB } from "./db/DB";
import fs from "fs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
type movie = {
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
};

const app: Application = express();
const PORT_NUMBER: number = Number(process.env.PROCESS)|| 3000;
const TOKEN_KEY = process.env.SECRET || "test";

app.use(cors());
app.use(bodyParser.json());

//add bookmarks
function addBookmark(row, movies) {
  let bookmarkedMovies: string[] = row.bookmark ? row.bookmark.split(",") : [];
  if (bookmarkedMovies) {
    return movies.map((movie) => {
      if (bookmarkedMovies.indexOf(movie.title) > -1) {
        console.log(movie);
        let temp = { ...movie };
        temp.isBookmarked = true;
        return temp;
      } else return movie;
    });
  } else {
    return [...movies];
  }
}

//middle ware
// function verifyToken(req: Request, res: Response, next) {
//   let loginData = req.body;
//   const token = req.cookies.token;
//   const user = jwt.verify(token, TOKEN_KEY);
//   function sort(row) {
//     if (row) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   }
// }

//get requests
app.get("/", (req, res) => {
  let movies: movie[] = JSON.parse(
    fs.readFileSync(__dirname + "/data.json", "utf8")
  );
  function sort(row) {
    if (row) {
    } else {
      res.redirect("/login");
    }
  }
});

//post requests
app.post("/login", async (req: Request, res: Response) => {
  let loginData = req.body;
  console.log(loginData);

  try {
    let movies = JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf8"));

    // Create token
    console.log(TOKEN_KEY);

    const token = jwt.sign(loginData, TOKEN_KEY, {
      expiresIn: "1h",
    });

    const DATA_BASE = new DB();
    DATA_BASE.verify(loginData.email, sort);

    //callback function
    function sort(row) {
      if (row) {
        // verifying password
        bcrypt.compare(
          loginData.password,
          row.user_password,
          function (err, result) {
            let finalMovie;
            if (result) {
              finalMovie = addBookmark(row, movies);
              console.log("token\n" + token);
            }
            finalMovie = finalMovie ? finalMovie : [];
            res.json({ result, finalMovie, token });
          }
        );
      } else {
        res.json("login failed");
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    // response sender
    function resSender(result) {
      console.log(result);
      res.json(result);
    }
    const SALTROUNDS = 10;
    let loginData = req.body;
    // hashing password
    bcrypt.genSalt(SALTROUNDS, function (err, salt) {
      bcrypt.hash(loginData.password, salt, function (err, hash) {
        const DATA_BASE = new DB();
        DATA_BASE.create(loginData.email, hash, resSender);
        console.log(hash);
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`MOVIE SERVER
		http://localhost:${PORT_NUMBER}/`);
});
