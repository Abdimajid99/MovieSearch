"use strict";

//! MAIN TO-DOS.

//done - TODO : put this project in github.
//TODO: create the frontend
//!       -- do the modal functionality
//!       -- put a heading that says ' no movies with this title have been found' when there are no movies to be shown.
//!       -- watch fireships course vids again to make sure everything is good.
//TODO: host it on render

//TODO: create terminal quiz game
//TODO: make a resume

//TODO: apply to the source graph job

//

const formEle = document.querySelector("form");
const searchInput = document.querySelector("form input");
const searchBtn = document.querySelector("form button");
const moviesContainer = document.querySelector(".movies-container");

const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");

const openModal = () => {
  modalContainer.classList.add("open");
  //disables body scroll when modal is open
  document.body.style.overflowY = "hidden";
};
const closeModal = () => {
  modalContainer.classList.remove("open");
  //re-enables body scroll when modal is hidden
  document.body.style.overflowY = "auto";
};
modalOverlay.addEventListener("click", closeModal);

const showSpinner = (element) =>
  (element.innerHTML = `<span class="loader"></span>`);
// const hideSpinner = (element) => (element.innerHTML = ``);

//

const displayMovies = function (movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(({ _id, title, poster, year, imdb: { rating } }) => {
    //the onerror event listener is used to remove broken image icon in chrome.
    const html = `
    <div class="movie" title="${title}" onclick="displayMovieDetails('${_id}')">
        <div class="image-wrapper"> <img  src="${poster}" alt="poster for the movie: ${title}" loading="lazy" onerror="this.style.display = 'none'"></div>
        <div class="info">
            <p class="title">${title} (${year})</p>
            <span>${rating}</span>
        </div>
    </div>
        `;

    moviesContainer.insertAdjacentHTML("beforeend", html);

    //alternatively:
    //add an id attribute to the movie element then select it. (can't use querySelector here)
    // const movieEle = document.getElementById(_id);
    // movieEle.addEventListener("click", () => displayMovieDetails(_id));
  });
};

//

const displayMovieDetails = async function (id) {
  openModal();
  showSpinner(modal);

  try {
    const res = await fetch(`http://localhost:3001/${id}`);
    const { title, poster, year, genres, plot, cast } = await res.json();

    //the onerror event listener is used to remove broken image icon in chrome.
    const html = `
          <div class="modal">
            <button id="close-btn" onclick="closeModal()">&#10006;</button>
            <div class="poster-wrapper">
                <img src="${poster}" alt="${title}" class="poster" loading="lazy" onerror="this.style.display = 'none'">
            </div>
            <div class="movie-info">
                <h2 class="movie-title">${title} (${year})</h2>
                <ul class="movie-genres">
                ${genres.map((genre) => `<li>${genre}</li>`).join(" ")}
                </ul>
                <p class="movie-synopsis"> ${plot}</p>
                <h2 class="movie-cast-heading">Cast</h2>
                <ul class="movie-cast">
                ${cast
                  .slice(0, 4)
                  .map((cast) => `<li>${cast}</li>`)
                  .join(" ")}
                </ul>
            </div>
        </div>
  `;

    modal.insertAdjacentHTML("beforeend", html);
  } catch (error) {
    modal.classList.add("error");
    modal.innerHTML = `
        <p>An error has occurred. Please try again</p>
        <button class="btn" onclick="displayMovieDetails('${id}')">Try again</button>
      `;
  }
};

//

formEle.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchBtn.disabled = true;
  showSpinner(moviesContainer);

  try {
    const searchedTitle = searchInput.value.trim();
    const res = await fetch(`http://localhost:3001/?title=${searchedTitle}`);
    const movies = await res.json();

    movies.length > 0
      ? displayMovies(movies)
      : (moviesContainer.innerHTML = `<p class="error">No Movies with The Title "${searchedTitle}" have been found </p>`);
  } catch (error) {
    moviesContainer.innerHTML =
      "<p>An error has occurred. Please try again</p>";
  }

  searchBtn.disabled = false;
});
