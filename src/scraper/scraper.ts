import puppeteer, { JSHandle } from "puppeteer";
import { ClientService } from "@services/Client";
import { Request, Response } from "express";

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

  static async loginAndScrape(req: Request, res: Response) {
    const browser = await puppeteer.launch();
    try {
      const link: string = req.body.url;
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(0);
      await page.goto(link);
      console.log(link);
      // await page.evaluate(
      //   () =>
      //     (document.getElementById("email").value = process.env
      //       .SCRAPE_USER as string)
      // );

      await page.type("#email", process.env.SCRAP_USER);
      await page.type("#pass", process.env.SCRAP_PASSWORD);

      const loginButton: JSHandle = await page.evaluateHandle(
        () => document.getElementsByName("login")[0]
      );
      const buttonID = loginButton._remoteObject.description.slice(6, 15);
      console.log(buttonID);
      // await loginButton.click();
      await page.click(loginButton._remoteObject.description);
      await page.waitForNavigation();

      const userName: string = await page.evaluate(
        () =>
          document.querySelector(".a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7")
            .innerText
      );
      const client = {
        name: userName,
        cpf: "44433322211",
        active: true,
      };

      const Client = new ClientService();
      Client.add(client);
      return res.json(userName);
    } catch (error) {
      console.log(error);
    } finally {
      await browser.close();
    }
  }
}
