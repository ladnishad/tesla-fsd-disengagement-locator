const routes = (app) => {
  app.get("/welcome", async (req, res) => {
    res.send("Data will be sent here");
  });

  app.post("/data", (req, res) => {
    console.log("Request received");
    console.log("Parameters are");
    console.log(req.body.model);
    console.log(req.body.lat);
    console.log(req.body.long);
    const { model, lat, long } = req.body;

    try {
      const coordinatesRegex = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;
      const latRegex = /^(\+|-)?(?:90(?:(?:.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:.[0-9]{1,6})?))$/;
      const longRegex = /^(\+|-)?(?:180(?:(?:.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:.[0-9]{1,6})?))$/;

      if (!coordinatesRegex.test(`${lat},${long}`)) {
        res.status(409).json({ message: "Invalid co-ordinates" });
        return res;
      }
      res.send(`${model} had a disengagement at ${lat}, ${long}`);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });

  app.get("*", async (req, res) => {
    res.send("Invalid link");
  });
};

module.exports = { routes };
