import puppeteer from "puppeteer";
import { Request } from "express";

export class Scraper {
  static async scrapeClassName(req: Request) {
    const browser = await puppeteer.launch();
    try {
      const link: string = req.body.url;
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(0);
      await page.goto(link);
      console.log(link);
      const title = await page.evaluate(
        () => document.querySelector("h1").innerText as string
      );
      console.log(title);
      return title;
    } catch (error) {
      console.log(error);
    } finally {
      await browser.close();
    }
  }
}
