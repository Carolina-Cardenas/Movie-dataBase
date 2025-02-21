function displayMovieDetails(movie) {
  const movieDetailsDiv = document.querySelector("#movieDetails");
  movieDetailsDiv.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
  `;
}

function displayNoMovieFound() {
  const movieDetailsDiv = document.querySelector("#movieDetails");
  movieDetailsDiv.innerHTML = "<p>No movie found.</p>";
}

function displayError(errorMessage) {
  const movieDetailsDiv = document.querySelector("#movieDetails");
  movieDetailsDiv.innerHTML = `<p>Error: ${errorMessage}</p>`;
}

function displayTopTwentyMovies(movies) {
  const movieList = document.querySelector("#cardContainer");
  console.log("Movie List:", movieList);

  movieList.innerHTML = movies
    .map(
      (movie) => `
        <article class="movie-card">
          <a href="${movie.imdbID}">
            <figure>
              <img src="${movie.Poster}" alt="${movie.Title}" />
            </figure>
          </a>
        </article>`
    )
    .join("");
}

export {
  displayMovieDetails,
  displayNoMovieFound,
  displayError,
  displayTopTwentyMovies,
};
