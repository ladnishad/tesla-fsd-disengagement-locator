import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { routes } from "./routes";

import { importCars } from "./dataIngestions/importCars";

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

routes(app);

app.listen(process.env.PORT, async () => {
  console.log(`Server started on port ${process.env.PORT}`);

  // await importCars();
});
