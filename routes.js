import {
  RecordDisengagement,
  DisplayDisengagements,
  GetDisengagements,
} from "./controllers/disengagements/DisengagementController";

import { GetVersions, AddVersion } from "./controllers/versions/VersionsController"

const routes = (app) => {
  app.get("/welcome", async (req, res) => {
    res.send("Welcome. Send your data to the api at the /record endpoint");
  });

  app.route("/record").post(RecordDisengagement);

  app.route("/disengagements").get(DisplayDisengagements);
  app.route("/view-disengagements").get(GetDisengagements);

  app.route("/admin/addVersion").post(AddVersion)

  app.route("/versions").get(GetVersions)

  app.get("*", async (req, res) => {
    res.redirect("/disengagements");
  });

  app.post("*", async (req, res) => {
    res.redirect("/disengagements");
  });
};

module.exports = { routes };
