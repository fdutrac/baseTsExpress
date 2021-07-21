import puppeteer, { JSHandle } from "puppeteer";

export class LoginScrapper {
  static async login(link: string) {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(0);
      await page.goto(link);

      await page.type("#email", process.env.SCRAP_USER);
      await page.type("#pass", process.env.SCRAP_PASSWORD);

      const loginButton: JSHandle = await page.evaluateHandle(
        () => document.getElementsByName("login")[0]
      );
      const buttonID: string = loginButton._remoteObject.description;
      await page.click(buttonID);
      await page.waitForNavigation();
      return page;
    } catch (error) {
      console.log(error);
    }
  }
}
