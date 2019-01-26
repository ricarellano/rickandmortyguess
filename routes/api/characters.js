const express = require("express");
const router = express.Router();
const request = require("request");
const rp = require("request-promise");

router.get("/test", (req, res) =>
  res.json({
    msg: "Characters Works"
  })
);

const rickandmortyApi = "https://rickandmortyapi.com/api/character/";

// @route   GET api/characters
// @desc    GET Character
// @accesss Public
router.get("/:id", (req, res) => {
  rp({
    uri: rickandmortyApi + `${req.params.id}`,
    json: true
  })
    .then(result => {
      res.json(getParams(result));
    })
    .catch(err => res.status(404).json(err));
});

function getParams(character) {
  return {
    id: character.id,
    name: character.name.toUpperCase(),
    species: character.species,
    image: character.image
  };
}

module.exports = router;
