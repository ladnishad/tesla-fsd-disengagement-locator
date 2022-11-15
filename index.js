const express = require("express");
const { routes } = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

routes(app);

app.listen(8082, async () => {
  console.log(`Server running on port 8082`);
});
