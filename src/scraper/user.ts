import { ClientService } from "@services/Client";
import { EvaluateFn, Page } from "puppeteer";

export class Scraper {
  static async getName(page) {
    try {
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
      return "Login Succeeded!";
    } catch (error) {
      console.log(error);
    }
  }

  static async getFriends(page: Page) {
    try {
      await page.goto("https://www.facebook.com/friends/list", {
        waitUntil: "load",
      });
      console.log(page.url());

      const getFriendsList = () => {
        const array = Array.from(
          document.getElementsByClassName("qzhwtbm6 knvmm38d"),
          (e) => e.innerText
        );
        return array.filter((e) => !/\d/.test(e));
      };

      const getTotal = () => {
        const array = Array.from(
          document.getElementsByClassName(
            "rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 e5nlhep0 aodizinl"
          ),
          (e) => e.innerText
        );
        const totalArray = array.filter((word) => word.includes("amigos"));
        const totalString = totalArray[0].split(".").join("");
        const lastIndex = totalString.lastIndexOf(" ");
        const formattedString = totalString.substring(0, lastIndex);
        return parseInt(formattedString, 10);
      };

      const waitFor = (
        timeToWait: number,
        selector: EvaluateFn
      ): Promise<string> => {
        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            resolve(await page.evaluate(selector));
            reject(new Error());
          }, timeToWait);
        });
      };

      const list = await waitFor(5000, getFriendsList);
      const listLenght = list.length;
      const totalFriends = await waitFor(5000, getTotal);
      console.log("listLenght", listLenght);
      console.log("totalFriends", totalFriends);

      console.log("list", list);
      return list;
    } catch (error) {
      console.log("Error", error);
    }
  }
}
