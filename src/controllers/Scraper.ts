import { Request, Response } from "express";
import { LoginScrapper } from "../scraper/login";
import { Scraper } from "../scraper/user";

export class ScraperController {
  static getName = async (req: Request, res: Response) => {
    try {
      const page = await LoginScrapper.login(req.body.url);
      const name = await Scraper.getName(page);
      return res.json(name);
    } catch (error) {
      res.json(error);
    }
  };

  static getFriends = async (req: Request, res: Response) => {
    try {
      const page = await LoginScrapper.login(req.body.url);
      const friends = await Scraper.getFriends(page);
      return res.json(friends);
    } catch (error) {
      res.json(error);
    }
  };
}
