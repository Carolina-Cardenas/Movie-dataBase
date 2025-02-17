import { getFiveMovies, searchAllMovies } from "./api";

async function searchAllMovies(event) {
  event.preventDefault();
  let searchMovieImput = document
    .querySelector("#searchMovieInput")
    .value.toLowerCase();
  console.log("search:", searchMovieImput);

  try {
    let movieList = await searchAllMovies(searchMovieImput);
    let movie = movieList.search.find(
      (p) => p.Title.toLowerCase() === searchMovieImput
    );

    if (movie) {
      let movieDetailsRespons = await fetch(movie.imdbID);
      if (!movieDetailsRespons.ok) {
        throw new Error(`Error fetching data from URL: ${movie.url}`);
      }
      let movieDetails = await movieDetailsRespons.json();
      console.log("Movies Details:", movieDetails);

      document.getElementById("movieDetails").innerHTML =
        "<p>Not found this Movie.</p>";
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

export { searchAllMovies };
