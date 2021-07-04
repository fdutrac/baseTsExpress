import { Request, Response } from "express";
import { UserService } from "@services/User";

export class ClientController {
  static add = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const userService = new UserService();
      const user = await userService.add(req.body);
      console.log(user);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  };

  static list = async (req: Request, res: Response) => {
    try {
      const userService = new UserService();
      const user = await userService.list(req.query);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  };
}
