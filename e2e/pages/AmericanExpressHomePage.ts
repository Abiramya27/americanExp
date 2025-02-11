import { Locator, Page } from "@playwright/test";
import { BrowserActions } from "../shared/BrowserActions";
import { SyncWaits } from "../shared/Constants";

export class AmericanExpressHomePage {
  page: Page;
  browserAction: BrowserActions;

  readonly toutAccepterButton: Locator;
  readonly cartesAmericanExpressCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browserAction = new BrowserActions();
    this.toutAccepterButton = page.locator("button#user-consent-management-granular-banner-accept-all-button");
    this.cartesAmericanExpressCard = page.locator("a:has-Text('Cartes American Express®')");
  }

  async navigateToAmericanExpress(){
    await this.page.goto(await this.browserAction.getUrl('AmericanExpress'))
  }

  async clickCartesAmericanExpressCard(){
    await this.browserAction.staticWait(SyncWaits.minWaitInMilis * 3,"Wait for Element To load",this.page);
    await this.clickToutAccepterButton();
    await this.browserAction.clickElement(this.cartesAmericanExpressCard);
  }

  async clickToutAccepterButton(){
    await this.browserAction.clickElement(this.toutAccepterButton);
  }
}
