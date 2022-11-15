import express from "express";
import dotenv from "dotenv";

import { routes } from "./routes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

routes(app);

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
