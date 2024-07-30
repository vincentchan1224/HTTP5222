const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests
/*
 * Functions for Trakt API requests.
 */
async function getTrendingMovies() {
  let reqUrl = `${trakt}/movies/trending?extended=full`;
  //await fetch(<req_url>, <options>)
  let response = await fetch(reqUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json(); //return the JSON data from the response
}
async function getRelatedMovies(imdbId) {
  let reqUrl = `${trakt}/movies/${imdbId}/related`;
  let response = await fetch(reqUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json();
}

async function getTopWatchedShows() {
  const reqUrl = `${trakt}/shows/watched/weekly?limit=15`;

  const response = await fetch(reqUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

//export functions
module.exports = {
  getTrendingMovies,
  getRelatedMovies,
  getTopWatchedShows,
};
