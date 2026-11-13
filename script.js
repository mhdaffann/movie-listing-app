// Enter your OMDb API key here
const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=79a29298";

const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

// Search movies
async function searchMovies() {
const searchValue = searchInput.value.trim();

if (!searchValue) {
    movieContainer.innerHTML =
        "<h2>Please enter a movie name!</h2>";
    return;
}

movieContainer.innerHTML =
    "<h2>Searching movies...</h2>";

try {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchValue)}`
    );

    const data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieContainer.innerHTML =
            "<h2>No movies found!</h2>";
    }

} catch (error) {
    movieContainer.innerHTML =
        "<h2>Something went wrong. Try again!</h2>";
}

}

// Display movies
function displayMovies(movies) {
movieContainer.innerHTML = "";

movies.forEach(movie => {

    const poster = movie.Poster !== "N/A"
        ? movie.Poster
        : "https://placehold.co/300x450?text=No+Poster";

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
    `;

    movieContainer.appendChild(movieCard);
});

}

// Search when Enter is pressed
searchInput.addEventListener("keydown", function(event) {
if (event.key === "Enter") {
searchMovies();
}
});
