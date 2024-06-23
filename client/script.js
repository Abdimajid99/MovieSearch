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
const moviesContainer = document.querySelector(".movies-container");

const displayMovies = function (movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(({ _id, title, poster, year, imdb: { rating } }) => {
    const html = `
    <div class="movie" title="${title}" id=${_id}>
        <div class="image-wrapper"> <img src="${poster}" alt=" poster for the movie: ${title}"></div>
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
