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
  });
};

formEle.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchedTitle = searchInput.value.trim();

  const res = await fetch(`http://localhost:3001/?title=${searchedTitle}`);
  const movies = await res.json();
  // console.log(movies);

  displayMovies(movies);
});
