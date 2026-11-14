// Add your replacement OMDb API key here
const API_KEY = "25ce5b6a";

const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

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

    if (data.Response === "True" && data.Search) {
        displayMovies(data.Search);
    } else {
        movieContainer.innerHTML =
            `<h2>${data.Error || "No movies found!"}</h2>`;
    }

} catch (error) {
    console.error(error);
    movieContainer.innerHTML =
        "<h2>Something went wrong. Try again!</h2>";
}

}

function displayMovies(movies) {
movieContainer.innerHTML = "";

movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const poster = movie.Poster !== "N/A"
        ? movie.Poster
        : "https://placehold.co/300x450?text=No+Poster";

    movieCard.innerHTML = `
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
    `;

    movieContainer.appendChild(movieCard);
});

}

searchInput.addEventListener("keydown", function(event) {
if (event.key === "Enter") {
searchMovies();
}
});
