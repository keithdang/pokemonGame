module.exports = app => {
  app.post("/api/points", async (req, res) => {
    //updating the info giving from the mongodb
    req.user.points += 5;
    //sending this info into mongodb
    const user = await req.user.save();
    res.send(user);
  });
};
