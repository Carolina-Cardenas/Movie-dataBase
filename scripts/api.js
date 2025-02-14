const API_KEY = "24dd77fa";

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

async function GetTopFiveMovies() {
  const url = "https://santosnr6.github.io/Data/favoritemovies.json";
  try {
    let movies = fetchData(url);
    console.log("Five Movie List:", movies);
    return movies;
  } catch (error) {
    console.error(`Error getting five movie list: ${error.message}`);
    throw error;
  }
}

async function getAllMovies() {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  try {
    let movies = fetchData(url);
    let movieAllList = await response.json();
    console.log("All Movie List:", movieAllList);
    return movieAllList;
  } catch (error) {
    console.error(`Error getting movie list: ${error.message}`);
    throw error;
  }
}

async function getMovieDetails(imdbID) {
  const url = "http://www.omdbapi.com/?apikey=[yourkey]&plot=full&i=[imdb-ID]";
  try {
    let movies = fetchData(url);
    let movieDetails = await response.json();
    console.log("Movie Details:", movieDetails);
    return movieDetails;
  } catch (error) {
    console.error(`Error getting movie details: ${error.message}`);
  }
}

export { getAllMovies, GetTopFiveMovies, getMovieDetails, API_KEY };
