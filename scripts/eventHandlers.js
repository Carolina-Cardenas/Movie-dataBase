import {
  getMoviesList,
  searchMovies,
  randomMovies,
  fetchMoviesDetails,
} from "./api.js";
import {
  displayMovieDetails,
  displayNoMovieFound,
  displayError,
  renderMovies,
} from "./domUtils.js";
import { renderTrailers } from "./carousel.js";

async function handleMovieSearch(event) {
  event.preventDefault();

  let searchMovieInput = document
    .querySelector("#searchMovieInput")
    .value.toLowerCase()
    .trim();

  try {
    const encodedSearchTerm = encodeURIComponent(searchMovieInput);

    // Redirect to search.html with the search term as a query parameter
    window.location.href = `search.html?search=${encodedSearchTerm}`;
    if (movie && movie.Title) {
      // if (movie.length === 1) {
      //   displayMovieDetails(movie);
      // } else {
      displayMovies(movie);
      // }
    } else {
      displayNoMovieFound();
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    displayError(error.message);
  }
}

async function showTopTwentyMovies() {
  try {
    let movieCollection = await getMoviesList();
    if (movieCollection && movieCollection.length > 0) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const container = document.querySelector("#cardContainer");
      console.log("Es showTopTwentyMovies");
      renderMovies(container, movieCollection, favorites);
    } else {
      showEmptyStateMessage();
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
async function showFavorites() {
  try {
    const favoriteMoviesContainer = document.getElementById("cardContainer");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
      favoriteMoviesContainer.innerHTML =
        "<p>You don't have any favorite movies yet.</p>";
      return;
    }

    const favoriteMoviesList = await fetchMoviesDetails(favorites);
    console.log("Es sgiwFavorites");
    renderMovies(favoriteMoviesContainer, favoriteMoviesList, favorites);
  } catch (error) {
    console.error("Error loading favorites page:", error);
  }
}

async function displayRandomTrailers() {
  try {
    let randomMovieCollection = await randomMovies();
    randomMovieCollection.forEach((movie, index) => {
      renderTrailers(movie, index + 1);
    });
  } catch (error) {
    console.error("Error loading trailers:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    try {
      await showTopTwentyMovies();
    } catch (error) {
      console.error("Error general en DOMContentLoaded:", error);
      displayError("An error occurred while loading the page.");
    }
  }
});

export {
  handleMovieSearch,
  showTopTwentyMovies,
  displayRandomTrailers,
  showFavorites,
};
