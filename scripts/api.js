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

async function randomMovies() {
  const url = "https://santosnr6.github.io/Data/favoritemovies.json";
  try {
    let fiveMovies = await fetchData(url);
    return fiveMovies.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 5);
  } catch (error) {
    console.error(`Error getting five movie list: ${error.message}`);
    throw error;
  }
}

async function searchMovies(query) {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  try {
    let movieList = await fetchData(url);
    console.log(" Movie List:", movieList);
    return movieList;
  } catch (error) {
    console.error(`Error getting movie list: ${error.message}`);
    throw error;
  }
}

async function getMovieDetails(imdbID) {
  const url = "http://www.omdbapi.com/?apikey=[yourkey]&plot=full&i=[imdb-ID]";
  try {
    let movieDetails = await fetchData(url);
    console.log("Movie Details:", movieDetails);
    return movieDetails;
  } catch (error) {
    console.error(`Error getting movie details: ${error.message}`);
  }
}

export { searchMovies, getMoviesList, getMovieDetails, API_KEY, randomMovies };
