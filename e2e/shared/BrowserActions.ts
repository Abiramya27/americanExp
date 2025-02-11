import { BrowserContext, chromium, expect, Locator, Page } from "@playwright/test";
import { chromepath } from "chrome-paths";
import * as loginData from "../ApplicationURL.json"

export class BrowserActions {
  page: Page;

  async clickElement(webElement: Locator): Promise<void> {
    await webElement.dispatchEvent("click");
  }

  async clickRadioElement(webElement: Locator): Promise<void> {
    await expect(webElement).toBeVisible();
    await webElement.check();
  }

  async enterText(webElement: Locator, text: string): Promise<void> {
    await webElement.fill(text);
  }

  async getRandomSevenDigitNumbers(): Promise<number> {
   const min = 1000000;
   const max = 9999999;
   return Math.floor(Math.random()*(max-min+1))+min;
  }

  async selectDropdown(dropDownLocator:Locator,value:string){
    await dropDownLocator.selectOption(value)
  }

  async getUrl(appName: string){
    let url: string = "";
    if(appName == 'AmericanExpress'){
      url = loginData.AmericanExpress.url
    }
    return url;
  }

  async getBrowserContext() {
    const browser = await chromium.launch({
      executablePath: chromepath,
      args: ["--incognito", "--start-maximized", "--ignore-certificate-errors"],
    });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1024 },
    });
    await context.clearCookies();
    return context;
  }

  async getPageInstance(context: BrowserContext) {
    return await context.newPage();
  }

  async staticWait(wait: any, message: string, page: Page) {
    await page.waitForTimeout(wait);
  }
}
