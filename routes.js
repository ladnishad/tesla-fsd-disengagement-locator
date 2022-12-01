import {
  RecordDisengagement,
  DisplayDisengagements,
  GetDisengagements,
} from "./controllers/disengagements/DisengagementController";

const routes = (app) => {
  app.get("/welcome", async (req, res) => {
    res.send("Welcome. Send your data to the api at the /record endpoint");
  });

  app.route("/record").post(RecordDisengagement);

  app.route("/disengagements").get(DisplayDisengagements);
  app.route("/view-disengagements").get(GetDisengagements);

  app.get("*", async (req, res) => {
    res.redirect("/disengagements");
  });

  app.post("*", async (req, res) => {
    res.redirect("/disengagements");
  });
};

module.exports = { routes };
