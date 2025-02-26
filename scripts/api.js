const API_KEY = "24dd77fa";
const API_URL = "https://www.omdbapi.com/?apikey=24dd77fa&i=";

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
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  try {
    let movie = await fetchData(url);
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

async function fetchMoviesDetail(id) {
  try {
    const response = await fetch(API_URL + id);
    console.log("Response", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie by ID ${id}:`, error);
    return null;
  }
}

async function fetchMoviesDetails(ids) {
  console.log("Ids", ids);
  const validIds = ids.filter(
    (id) => id !== null && id !== undefined && id !== ""
  );

  return Promise.all(validIds.map(fetchMoviesDetail));
}

export {
  searchMovies,
  getMoviesList,
  getMovieDetails,
  randomMovies,
  fetchMoviesDetail,
  fetchMoviesDetails,
};
