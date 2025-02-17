import {
  searchMovies,
  getMoviesList,
  getMovieDetails,
  randomMovies,
} from "./api.js";

console.log("main");
getMoviesList().then((data) => console.log("Personajes iniciales:", data));
randomMovies().then((data) => console.log("Películas aleatorias:", data));
