import { toggleFavorite } from "./favorites.js";
async function loadSVG(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error loading SVG: ${response.status}`);
  }

  return await response.text();
}
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

async function renderMovies(container, movies, favorites = []) {
  if (movies.length === 0) {
    container.innerHTML = "<p>No favorite movies found.</p>";
    return;
  }
  console.log("Movie:", movies);
  container.innerHTML = await Promise.all(
    movies.map(async (movie) => {
      const isFavorite = favorites.includes(movie.imdbID);
      const svgContent = await loadSVG("./res/icons/star.svg");

      const svgHTML = svgContent.replace(
        /<svg\s+/,
        `<svg class="favorite-star ${isFavorite ? "favorited" : ""}" data-id="${
          movie.imdbID
        }" `
      );
      return `<article class="movie-card">
       ${svgHTML} 
         
          <a href="${movie.imdbID}">
            <figure>
              <img src="${movie.Poster}" alt="${movie.Title}" />
            </figure>
          </a>
        </article>`;
    })
  ).then((results) => results.join(""));
  document.querySelectorAll(".favorite-star").forEach((star) => {
    star.addEventListener("click", (event) => {
      event.stopPropagation();
      const svg = event.currentTarget;
      toggleFavorite(event, svg);
    });
  });
}

export { displayMovieDetails, displayNoMovieFound, displayError, renderMovies };
