const _ = require("lodash");
const mongoose = require("mongoose");
const Pokemon = mongoose.model("pokemons");
const Move = mongoose.model("moves");
const Type = mongoose.model("types");
module.exports = app => {
  app.get("/api/pokemon", async (req, res) => {
    const pokemon = await Pokemon.find(function(err, pokemon) {
      res.send(pokemon);
    });
  });
  app.post("/api/select/pokemon", async (req, res) => {
    req.user.pokemon = req.body;
    const user = await req.user.save();
    res.send(user);
  });
  app.get("/api/move", async (req, res) => {
    const pokemon = await Move.find({ name: req.query.name });
    res.send(pokemon);
  });
  app.get("/api/opponent/pokemon", async (req, res) => {
    const pokemon = await Pokemon.find({ pokeId: req.query.pokeId });
    res.send(pokemon);
  });
  app.get("/api/team", async (req, res) => {
    console.log("kdawg2: ", req.query.name);
    //req.user.points = 10;
    //const user = await req.user.save();
    //res.send(user);
    const pokemon = await Pokemon.find({ name: req.query.name });
    //req.user.team = pokemon;
    console.log("kdawg3: ", pokemon);
    res.send(pokemon);
  });
  app.post("/api/select/team", async (req, res) => {
    req.user.team = req.body;
    try {
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/api/index", async (req, res) => {
    console.log("k-----------dang:", req.body.number);
    req.user.index = req.body.number;
    // const user = await req.user.save();
    // res.send(user);
    try {
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.get("/api/opponent/move", async (req, res) => {
    const pokemon = await Move.find({ name: req.query.name });
    res.send(pokemon);
  });
  app.get("/api/type/move", async (req, res) => {
    const pokemon = await Type.find({ type: req.query.type });
    res.send(pokemon);
  });
  app.get("/api/type/moveSet", async (req, res) => {
    const pokemon = await Type.find(function(err, pokemon) {
      res.send(pokemon);
    });
  });
};
