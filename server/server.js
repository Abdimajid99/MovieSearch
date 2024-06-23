"use strict";

require("dotenv").config(); //this loads all the env variables from the .env file.

//express setup
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

//db setup
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.DATABASE_URL);
const database = client.db("sample_mflix");
const movies = database.collection("movies");

//routes
app.get("/", async (req, res) => {
  try {
    const title = req.query.title;

    // console.log(req.query);
    // console.log(req.query.title);

    const moviesList = await movies
      .find({ title: { $regex: "^" + title, $options: "i" } })
      .limit(20)
      .toArray();

    // console.log(moviesList);
    res.status(200).send(moviesList);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params.id);

    const movie = await movies.findOne({
      _id: new ObjectId(id),
    });

    // console.log(movie);
    res.status(200).send(movie);
  } catch (err) {
    res.status(500).send(err);
  }

  //   await client.close();
});

// what's a port? https://thevalleyofcode.com/the-internet/2-what-is-a-port
app.listen(3001, () => {
  console.log("server is running");
});

//
//
//

//some notes:
// //nodemon lib automatically restarts the server on save when changes are made to the file. we start nodemon by adding it as a start script in packages.json and running npm start

// //mongoose is a library that makes connecting to and making queries to the mongodb database easier
//
//

//// to construct a url and attach info to it you can:
//1. route parameters
// use url parameters, like you did in the ` /:id ` route/endpoint.
// app.get("/:id", (req, res) => {
//   const id = req.params.id; // the id sent by the frontend in the http request.
// });

//2. use query parameters in the URL
// app.get("/", (req, res) => {
//   const id = req.query.id; // the id sent by the frontend in the http request.
// });

// in the frontend, use the URL constructor and use url.searchParams methods to get and set the search parameters on the url like you did in the '/' route.
//eg
// const url = new URL(`http://localhost:3001`);

// url.searchParams.set("title", "The");
// url.toString();
// console.log(url);
// console.log("the actual url", url.toString());

// fetch(url)
//   .then((res) => res.json())
//   .then((res) => console.log(res));

//sources:
// https://medium.com/@aidana1529/understanding-the-difference-between-req-params-req-body-and-req-query-e9cf01fc3150
// https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
