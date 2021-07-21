import { Express, Request, Response } from "express";
import { UserController } from "@controllers/User";
import { ProductController } from "@controllers/Product";
import { ClientController } from "@controllers/Client";
import { ScraperController } from "@controllers/Scraper";

export default function (app: Express) {
  app.get("/", (req: Request, res: Response) => res.status(200));
  app.get("/user", UserController.list);
  app.post("/user", UserController.add);
  app.get("/product", ProductController.list);
  app.post("/product", ProductController.add);
  app.get("/client", ClientController.list);
  app.post("/client", ClientController.add);
  app.delete("/client/:id", ClientController.delete);
  app.post("/scraper/get_name", ScraperController.getName);
  app.post("/scraper/get_friends", ScraperController.getFriends);
  app.post("/scraper/parsePDF", ScraperController.scrapeCNH);
  
}
