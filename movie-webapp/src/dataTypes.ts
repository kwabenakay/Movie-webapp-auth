import { signInFunctionParams } from "react-auth-kit/dist/types";
export type movie = {
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

export type responseData = {
  result:boolean,
  finalMovie:movie[],
  token:signInFunctionParams
}
