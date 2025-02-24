function toggleFavorite(event, svg) {
  event.stopPropagation();
  const movieId = svg.getAttribute("data-id");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(movieId)) {
    favorites = favorites.filter((id) => id !== movieId);
    svg.classList.remove("favorited");
  } else {
    favorites.push(movieId);
    svg.classList.add("favorited");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export { toggleFavorite };
