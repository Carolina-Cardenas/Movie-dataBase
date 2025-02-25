import { getMoviesList, getMovieDetails, randomMovies } from "./api.js";
import {
  handleMovieSearch,
  showTopTwentyMovies,
  displayRandomTrailers,
} from "./eventHandlers.js";
import { removeFavorite } from "./favorites.js";

getMoviesList().then((data) => console.log("Personajes iniciales:", data));
randomMovies().then((data) => console.log("Películas aleatorias:", data));
getMovieDetails("tt0800039").then((data) =>
  console.log("Detalle de la pelicula", data)
);

document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    showTopTwentyMovies();
    displayRandomTrailers();

    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener("submit", handleMovieSearch);
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-favorite")) {
      const movieId = event.target.dataset.id;
      if (!movieId) return;
      removeFavorite(movieId);
    }
  });
});
