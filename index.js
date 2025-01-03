import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pagerouter from "./routes/pageContentRoutes.js";
import Projectrouter from "./routes/projectRoute.js";
import Testimonyrouter from "./routes/testimony.js";
import Techrouter from "./routes/techRoute.js";
import WhatWeDoRouter from "./routes/whatWeDoRouter.js";
import DeveloperRouter from "./routes/developerRouter.js";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

// const userName = accuratesoftwareintegrators;
// const password = NpJsezXiylwwiRva;

// mongoose
//   .connect("mongodb://localhost:27017/Portfolio")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch(() => {
//     console.log("Connection failed");
//   });

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Connection to MongoDB  failed", error);
  });

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/page", Pagerouter);
app.use("/project", Projectrouter);
app.use("/testimony", Testimonyrouter);
app.use("/tech", Techrouter);
app.use("/whatwedo", WhatWeDoRouter);
app.use("/developer", DeveloperRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
