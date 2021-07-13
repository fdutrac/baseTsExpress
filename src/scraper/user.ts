import { ClientService } from "@services/Client";
import { ElementHandle, EvaluateFn, Page } from "puppeteer";

export class Scraper {
  static async getName(page: Page) {
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

      function filterWord(element: string, wordsToFilter: string[]): boolean {
        const isFiltered: boolean = wordsToFilter.some((e) =>
          element.includes(e)
        );
        return !isFiltered;
      }

      const getFriendsList = (): string[] => {
        const array = Array.from(
          document.getElementsByClassName("qzhwtbm6 knvmm38d"),
          (e) => e.innerText
        );

        function filterNumerics(element: string) {
          return !/\d/.test(element);
        }

        return array.filter((e) => filterNumerics(e));
      };

      const getTotal = () => {
        const array = Array.from(
          document.getElementsByClassName(
            "rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 e5nlhep0 aodizinl"
          ),
          (e) => e.innerText
        );

        const totalArray = array.filter((word) => word.includes("amigos"));
        const totalString = totalArray[0].replace(".", "");
        const lastIndex = totalString.lastIndexOf(" ");
        const formattedString = totalString.substring(0, lastIndex);
        return parseInt(formattedString, 10);
      };

      const waitFor = (
        timeToWait: number,
        selector: EvaluateFn
      ): Promise<any> => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await page.evaluate(selector));
          }, timeToWait);
        });
      };

      const getFriendsAndScroll = async () => {
        const wordsToFilter = [
          "Não",
          "Anteriores",
          "um dia",
          "uma hora",
          "Ver tudo",
          "compartilhou",
          "compartilharam",
          "publicou",
          "mencionou",
          "mencionaram",
        ];

        // Returns Friends List with numbers filtered
        const list = await waitFor(2000, getFriendsList);
        // Returns Friends List with unwanted words filtered
        const filteredList = list.filter((e: string) =>
          filterWord(e, wordsToFilter)
        );

        const menuSelector =
          ".q5bimw55.rpm2j7zs.k7i0oixp.gvuykj2m.j83agx80.cbu4d94t.ni8dbmo4.eg9m0zos.l9j0dhe7.du4w35lb.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.l56l04vs.r57mb794.kh7kg01d.c3g1iek1.k4xni2cv";
        await page.waitForSelector(menuSelector);

        // Scroll down in friends div
        const menuToScroll: ElementHandle<Element>[] = await page.$$(
          menuSelector
        );

        const menuIndex = menuToScroll.length;
        const boundingBox = await menuToScroll[menuIndex - 1].boundingBox();
        await page.mouse.move(
          boundingBox.x + boundingBox.width / 2,
          boundingBox.y + boundingBox.height / 2
        );
        await page.mouse.wheel({ deltaY: 2500 });

        return filteredList;
      };

      const list = [];

      const totalFriends = await waitFor(3000, getTotal);

      const getWholeFriendsList = async () => {
        let alreadyInsertedsFriendsList = 0;
        do {
          const valueBefore = alreadyInsertedsFriendsList;

          list.push(
            ...(await getFriendsAndScroll()).slice(alreadyInsertedsFriendsList)
          );

          console.log(alreadyInsertedsFriendsList);
          alreadyInsertedsFriendsList = list.length;

          if (alreadyInsertedsFriendsList === valueBefore) {
            for (let i = 0; i < 3; i++) {
              await page.mouse.wheel({ deltaY: -2500 });
              await page.mouse.wheel({ deltaY: 2500 });
            }
          }
          if (alreadyInsertedsFriendsList === valueBefore) return;
        } while (list.length < totalFriends);
      };

      await getWholeFriendsList();

      const listLenght = list.length;

      console.log("listLenght", listLenght);
      console.log("totalFriends", totalFriends);
      console.log("list", list);

      return list;
    } catch (error) {
      console.log("Error", error);
    } finally {
      page.close();
    }
  }
}
