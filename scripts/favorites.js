import { fetchMoviesDetails } from "./api.js";
import { renderMovies } from "./domUtils.js";
import { showFavorites } from "./eventHandlers.js";

function toggleFavorite(event, svg) {
  event.stopPropagation();
  const movieId = svg.getAttribute("data-id");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(movieId)) {
    favorites = favorites.filter((id) => id !== movieId);
    svg.classList.remove("favorited");
  } else {
    favorites.push(movieId);
    svg.classList.add("favorited");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("favorites.html")) {
    showFavorites();
  }
});

function removeFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter((id) => id !== movieId);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  const favoriteMoviesContainer = document.getElementById("cardContainer");

  fetchMoviesDetails(favorites).then((movies) => {
    renderMovies(favoriteMoviesContainer, movies);
  });
}

export { toggleFavorite, removeFavorite };
