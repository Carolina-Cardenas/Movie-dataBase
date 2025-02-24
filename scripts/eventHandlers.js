import { getMoviesList, searchMovies, randomMovies } from "./api.js";
import {
  displayMovieDetails,
  displayNoMovieFound,
  displayError,
  displayTopTwentyMovies,
} from "./domUtils.js";
import { renderTrailers } from "./carousel.js";

async function handleMovieSearch(event) {
  event.preventDefault();

  let searchMovieInput = document
    .querySelector("#searchMovieInput")
    .value.toLowerCase()
    .trim();
  console.log("Searching for movie:", searchMovieInput);

  try {
    let movie = await searchMovies(searchMovieInput);
    console.log("searchMovieInput", searchMovieInput);
    if (movie && movie.Title) {
      displayMovieDetails(movie);
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
    console.log("Top Rated Movies:", movieCollection);
    if (movieCollection && movieCollection.length > 0) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      displayTopTwentyMovies(movieCollection, favorites);
    } else {
      showEmptyStateMessage();
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

async function displayRandomTrailers() {
  try {
    console.log("Displaying random trailers");
    let randomMovieCollection = await randomMovies();
    console.log("Random Movie Collection:", randomMovieCollection);
    randomMovieCollection.forEach((movie, index) => {
      renderTrailers(movie, index + 1);
    });
  } catch (error) {
    console.error("Error loading trailers:", error);
  }
}
export { handleMovieSearch, showTopTwentyMovies, displayRandomTrailers };
