import { Locator, Page } from "@playwright/test";
import { BrowserActions } from "../shared/BrowserActions";

import { json } from "stream/consumers"
import { SyncWaits } from "../shared/Constants";

export class UserDetailsPage {
  page: Page;
  browserAction: BrowserActions;
  readonly civiliteRadioButton: Locator;
  readonly preNomTextField:Locator;
  readonly nomTextField: Locator;
  readonly dateDeNaissanceTextField: Locator;
  readonly addressEmailTextField: Locator;
  readonly numeroDeTelephonePortableTextField: Locator;
  readonly sauvegarderEtContinuerButton: Locator;
  readonly countryCodeDropdown: Locator;
  readonly errorInputAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browserAction = new BrowserActions();
    this.civiliteRadioButton = page.locator('label[for="MS"]');
    this.preNomTextField = page.locator('input[id="fieldControl-input-firstName"]');
    this.nomTextField = page.locator('input[id="fieldControl-input-lastName"]');
    this.dateDeNaissanceTextField = page.locator('input[id="fieldControl-input-dateOfBirth"]');
    this.addressEmailTextField = page.locator('input[id="fieldControl-input-email"]');
    this.numeroDeTelephonePortableTextField = page.locator('input[id="fieldControl-input-mobilePhoneNumber"]');
    this.sauvegarderEtContinuerButton = page.locator('//button[contains(text(),"Sauvegarder et Continuer")]');
    this.countryCodeDropdown = page.locator('select#countryCode');
    this.errorInputAlert = page.locator('span#fieldControl-input-error-alert')
  }

  async fillUserDetails(data): Promise<void> {
    await this.browserAction.staticWait(SyncWaits.minWaitInMilis * 3,"Wait for Element To load",this.page);
    await this.browserAction.clickRadioElement(this.civiliteRadioButton);
    await this.browserAction.enterText(this.preNomTextField, data.FirstName);
    await this.browserAction.enterText(this.nomTextField, data.LastName);
    await this.browserAction.enterText(this.dateDeNaissanceTextField, data.DOB);
    await this.browserAction.enterText(this.addressEmailTextField,data.email);
    await this.enterPhoneNum('Inde')
  }
  
  async clickSauvegarderEtContinuerButton(): Promise<void> {
    await this.sauvegarderEtContinuerButton.click();
  }
  
  async enterPhoneNum(value: string){
    const telephoneNum = await this.browserAction.getRandomSevenDigitNumbers();
    await this.browserAction.selectDropdown(this.countryCodeDropdown,value);
    await this.browserAction.enterText(this.numeroDeTelephonePortableTextField,telephoneNum.toString());
  }
}
