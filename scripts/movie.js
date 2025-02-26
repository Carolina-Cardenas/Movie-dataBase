import { displayMovieDetails } from "./domUtils.js";
import { getMovieDetails } from "./api.js";
document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("movie.html")) {
    const movieDetails = document.querySelector("#movieDetails");
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("id");
    console.log("searchTerm", searchTerm);
    let movie = await getMovieDetails(searchTerm);
    console.log("movie.html", movie);
    console.log("movie.js");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    displayMovieDetails(movie, favorites);
  }
});
