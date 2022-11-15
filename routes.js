import {
  RecordDisengagement,
  ShowDisengagements
} from "./controllers/disengagements/DisengagementController";

const routes = app => {
  app.get("/welcome", async (req, res) => {
    res.send("Welcome. Send your data to the api at the /record endpoint");
  });

  app.route("/record").post(RecordDisengagement);

  app.route("/disengagements").get(ShowDisengagements);
  app.route("/disengagements").post(ShowDisengagements);

  app.get("*", async (req, res) => {
    res.redirect("/disengagements");
  });

  app.post("*", async (req, res) => {
    res.redirect("/disengagements");
  });
};

module.exports = { routes };
