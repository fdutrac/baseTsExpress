import { Express, Request, Response } from "express";
import { UserController } from "@controllers/User";

export default function (app: Express) {
  app.get("/", (req: Request, res: Response) => res.status(200));
  app.get("/user", UserController.list);
  app.post("/user", UserController.add);
}
