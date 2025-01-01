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
  .connect(
    "mongodb+srv://accuratesoftwareintegrators:NpJsezXiylwwiRva@cluster0.0ke3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/page", Pagerouter);
app.use("/project", Projectrouter);
app.use("/testimony", Testimonyrouter);
app.use("/tech", Techrouter);
app.use("/whatwedo", WhatWeDoRouter);
app.use("/developer", DeveloperRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
