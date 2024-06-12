"use strict";

const url = new URL(`http://localhost:3001`);

url.searchParams.set("title", "The");
url.toString();
console.log(url);
console.log("the actual url", url.toString());

fetch(url)
  .then((res) => res.json())
  .then((res) => console.log(res));

//

//! MAIN TO-DOS.

//TODO : put this project in github.
//TODO: create the frontend
//TODO: host it on render

//TODO: create terminal quiz game
//TODO: make a resume

//TODO: apply to the source graph job
//
