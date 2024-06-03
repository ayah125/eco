process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import express from "express";
import { dbconnection } from "./databases/db_connection.js";
import { bootstrap } from "./src/modules/bootstrap/index.route.js";
import { globalerror } from "./src/middleware/globalerror.js";
import { AppError } from "./src/utils/apperror.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.use("/uploads", express.static("uploads"));
bootstrap(app);
app.use(globalerror);
app.use("*", (req, res, next) => {
  next(new AppError(` error cant find : ${req.originalUrl}`, 404));
});
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
dbconnection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
