import { getAllMovies, GetTopFiveMovies, getMovieDetails } from "./api.js";

console.log("main");
GetTopFiveMovies().then((data) => console.log("Personajes iniciales:", data));
