import { searchMovies } from "./api.js";

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

export { handleMovieSearch };
