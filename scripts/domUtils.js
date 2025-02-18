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

export { displayMovieDetails, displayNoMovieFound, displayError };
