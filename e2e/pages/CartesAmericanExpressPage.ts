import { Locator, Page } from "@playwright/test";
import { BrowserActions } from "../shared/BrowserActions";
import { SyncWaits } from "../shared/Constants";

export class CartesAmericanExpressPage {
  page: Page;
  browserAction: BrowserActions;
  readonly cardList: Locator;
  readonly toutAccepterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browserAction = new BrowserActions();
    this.cardList = page.locator("div.row.pad-2-t.pad-3-b div.col-md-4 h2");
    this.toutAccepterButton = page.locator("button#user-consent-management-granular-banner-accept-all-button");
  }

  async clickEnSaviourPlusButton(cardName: string): Promise<void> {
    await this.browserAction.staticWait(SyncWaits.minWaitInMilis * 3,"Wait for Element To load",this.page);
    await this.clickToutAccepterButton();
    let enSaviourPlusButton = this.page.locator(`(//h2[contains(text(),'${cardName}')])[1]//ancestor::*[@class='col-md-12 margin-0-tb']//*[text()='En savoir plus']`
    );
    await this.browserAction.clickElement(enSaviourPlusButton);
  }

  async clickToutAccepterButton(){
    await this.browserAction.clickElement(this.toutAccepterButton);
  }
}
