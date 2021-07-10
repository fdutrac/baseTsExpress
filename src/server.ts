import express, { Express, Request, Response } from "express";
import config from "../config";
import routes from "./routes";
import { dbConnection } from "./db/index";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const port = config.port as number;

dbConnection();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  console.log("Server running at " + port);
  return res.json({ message: "Oe mundão" });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening in port ${process.env.PORT || port}`);
  routes(app);
});
