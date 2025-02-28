import { toggleFavorite } from "./favorites.js";
async function loadSVG(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error loading SVG: ${response.status}`);
  }

  return await response.text();
}

async function displayMovieDetails(movie, favorites = []) {
  const movieDetailsSection = document.querySelector("#movieDetails");
  const isFavorite = favorites.includes(movie.imdbID);
  const svgContent = await loadSVG("./res/icons/star.svg");

  const svgHTML = svgContent.replace(
    /<svg\s+/,
    `<svg class="favorite-star ${isFavorite ? "favorited" : ""}" data-id="${
      movie.imdbID
    }" `
  );
  movieDetailsSection.innerHTML = `
   <section class="movie-container">
    <section class="movie-media">
      <h2 class="movie-title">${movie.Title} (${movie.Year})</h2>
     
    </section>
     
     <article class="movie-info">
     <section class="movie-img">
       <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}" />
       </section>
       <section class="movie-details">
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <hr>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}/10</p>
        <hr>
        <h3>Plot</h3>
        <p id="moviePlot" class="movie-plot">${movie.Plot}</p>
        <a href="javascript:void(0);" id="readMore" class="read-more">Read More...</a>
        <hr>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        </article>
       ${svgHTML} 
        </section>
    </section>
  `;

  const readMoreLink = document.getElementById("readMore");
  const moviePlot = document.getElementById("moviePlot");

  document.querySelectorAll(".favorite-star").forEach((star) => {
    star.addEventListener("click", (event) => {
      event.stopPropagation();
      const svg = event.currentTarget;
      toggleFavorite(event, svg);
    });
  });
  if (readMoreLink && moviePlot) {
    readMoreLink.addEventListener("click", function () {
      moviePlot.classList.toggle("expanded");

      if (moviePlot.classList.contains("expanded")) {
        readMoreLink.textContent = "Read Less...";
      } else {
        readMoreLink.textContent = "Read More...";
      }
    });
  }
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
  console.log("Favorites:", container, movies, favorites);
  if (movies === 0) {
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
         
          <a href="movie.html?id=${movie.imdbID}">
            <figure>
              <img src="${movie.Poster}" alt="${movie.Title}" />
            </figure>
            <figcaption>${movie.Title}</figcaption>
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
