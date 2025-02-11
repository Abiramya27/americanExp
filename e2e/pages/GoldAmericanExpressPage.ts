import { Locator, Page } from "@playwright/test";
import { BrowserActions } from "../shared/BrowserActions";
import { SyncWaits } from "../shared/Constants";

export class GoldAmericanExpressPage {
  page: Page;
  browserAction: BrowserActions;
  readonly demandezVotreCarteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browserAction = new BrowserActions();
    this.demandezVotreCarteButton = page.locator("(//a[contains(text(),'Demandez votre Carte')])[1]")
  }

  async clickDemandezVotreCarteButton(): Promise<void>{
    await this.browserAction.staticWait(SyncWaits.minWaitInMilis * 3,"Wait for Element To load",this.page);
    await this.browserAction.clickElement(this.demandezVotreCarteButton);
  }
  
  
}
