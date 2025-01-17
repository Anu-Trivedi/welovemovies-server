const knex = require("../db/connection");

function list(isShowing = false) {
  if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id");
  }
  return knex("movies");
}

function read(movie_id) {
  return knex("movies as m").where({ "m.movie_id": movie_id }).first();
}

module.exports = {
  list,
  read,
};
