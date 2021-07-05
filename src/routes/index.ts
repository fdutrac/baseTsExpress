import { Express, Request, Response } from "express";
import { UserController } from "@controllers/User";
import { ProductController } from "@controllers/Product";
import { ClientController } from "@controllers/Client";
import { Scraper } from "src/scraper/scraper";

export default function (app: Express) {
  app.get("/", (req: Request, res: Response) => res.status(200));
  app.get("/user", UserController.list);
  app.post("/user", UserController.add);
  app.get("/product", ProductController.list);
  app.post("/product", ProductController.add);
  app.get("/client", ClientController.list);
  app.post("/client", ClientController.add);
  app.post("/scrape", Scraper.scrapeClassName);
  app.post("/login-and-scrape", Scraper.loginAndScrape);
}
