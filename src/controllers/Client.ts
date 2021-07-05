import { Request, Response } from "express";
import { ClientService } from "@services/Client";

export class ClientController {
  static add = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const clientService = new ClientService();
      const client = await clientService.add(req.body);
      console.log(client);
      res.json(client);
    } catch (error) {
      res.json(error);
    }
  };

  static list = async (req: Request, res: Response) => {
    try {
      const clientService = new ClientService();
      const client = await clientService.list(req.query);
      res.json(client);
    } catch (error) {
      res.json(error);
    }
  };
}
