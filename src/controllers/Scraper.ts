import { Request, Response } from "express";
import { LoginScrapper } from "../scraper/puppeteer/login";
import { Scraper } from "../scraper/puppeteer/user";
import { CNHScrape } from "src/scraper/pdf/providers/cnh";

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

  static scrapeCNH = (req: Request, res: Response) => {
    try {
      const data = CNHScrape.getData();
      console.log("done!")
      res.json("Parsed!")
    } catch (error) {
      res.json(error)
    }
  } 
}
