const API_KEY = "24dd77fa";
let fiveMovies = [];

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    throw error;
  }
}

async function getMoviesList() {
  const url = "https://santosnr6.github.io/Data/favoritemovies.json";
  try {
    let topTwentyMovies = await fetchData(url);
    topTwentyMovies = topTwentyMovies.slice(0, 20);
    console.log("Top 20 List:", topTwentyMovies);
    return topTwentyMovies;
  } catch (error) {
    console.error(`Error getting  movie list: ${error.message}`);
    throw error;
  }
}

// async function randomMovies() {
//   const url = "https://santosnr6.github.io/Data/favoritemovies.json";
//   try {
//     let fiveMovies = await fetchData(url);
//     return fiveMovies.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 5);
//   } catch (error) {
//     console.error(`Error getting five movie list: ${error.message}`);
//     throw error;
//   }
// }
async function randomMovies() {
  const url = "https://santosnr6.github.io/Data/favoritemovies.json";
  try {
    let movieData = await fetchData(url);
    return movieData.sort(() => Math.random() - 0.5).slice(0, 5);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
}

async function searchMovies(query) {
  console.log("query", query);
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${query}`;
  try {
    console.log("url :", url);
    let movie = await fetchData(url);
    console.log(" Movie:", movie);
    return movie;
  } catch (error) {
    console.error(`Error getting search movie: ${error.message}`);
    throw error;
  }
}

async function getMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&plot=full&i=${imdbID}`;
  try {
    let movieDetails = await fetchData(url);
    console.log("Movie Details:", movieDetails);
    return movieDetails;
  } catch (error) {
    console.error(`Error getting movie details: ${error.message}`);
  }
}

export { searchMovies, getMoviesList, getMovieDetails, API_KEY, randomMovies };
