import { searchMovies } from "./api.js";
import { renderMovies } from "./domUtils.js";
document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("search.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search");
    const movieCards = document.querySelector("#cardContainer");
    let movie = await searchMovies(searchTerm);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    renderMovies(movieCards, movie.Search, favorites);
  }
});
