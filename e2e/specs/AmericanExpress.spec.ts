import { test, Page, BrowserContext, expect } from "@playwright/test";
import { PoManager } from "../pages/PoManager";
import { BrowserActions } from "../shared/BrowserActions";
import * as data from "../UserDetailsTestData.json"
import { SyncWaits } from "../shared/Constants";

test.describe("American Express", async () => {
  let page: Page;
  let browserActions: BrowserActions;
  let context: BrowserContext;
  let poManager: PoManager;
  

  test.beforeAll(async () => {
    browserActions = new BrowserActions();
    context = await browserActions.getBrowserContext();
    page = await browserActions.getPageInstance(context);
    poManager = new PoManager(page);
  });

  test("Navigate to American Express application and Enter valid user details", async () => {
    await test.step("Navigate to American Express application", async () => {
      await poManager.americanExpressHomePage.navigateToAmericanExpress();
    })
    await test.step('Click Cartes American Express Card', async() => {
      await poManager.americanExpressHomePage.clickCartesAmericanExpressCard()
    })
    await test.step("Click En Saviour Plus Button", async () => {
      await poManager.cartesAmericanExpressPage.clickEnSaviourPlusButton('Carte Gold American Express');
    })
    await test.step("Click to Demandez votre carte Button", async () => {
      await poManager.goldAmericanExpressPage.clickDemandezVotreCarteButton();
    })
    await test.step("Fill user details and click SauvegarderETContinuer button", async () => {
      await poManager.userDetailPage.fillUserDetails(data.userDetails1);      
      await poManager.userDetailPage.clickSauvegarderEtContinuerButton();
    })
  });

  test("Navigate to American Express application,Enter invalid user details and verify the error message", async () => {
   await test.step("Navigate to American Express application", async () => {
     await poManager.americanExpressHomePage.navigateToAmericanExpress();
   })
   await test.step('Click Cartes American Express Card', async() => {
      await poManager.americanExpressHomePage.clickCartesAmericanExpressCard()
   })
   await test.step("Click En Saviour Plus Button", async () => {
     await poManager.cartesAmericanExpressPage.clickEnSaviourPlusButton('Carte Gold American Express');
   })
   await test.step("Click to Demandez votre carte Button", async () => {
     await poManager.goldAmericanExpressPage.clickDemandezVotreCarteButton();
   })
   await test.step("Fill user details and click SauvegarderETContinuer button", async () => {
     await poManager.userDetailPage.fillUserDetails(data.userDetails2);
     await browserActions.staticWait(SyncWaits.minWaitInMilis* 3,"Wait for Element To load",page);
     expect(poManager.userDetailPage.errorInputAlert.nth(0),'Error message should match').toContainText('Nom obligatoire.');
     expect(poManager.userDetailPage.errorInputAlert.nth(1),'Error message should match').toContainText('Vous devez avoir plus de 18 ans.');
     expect(poManager.userDetailPage.errorInputAlert.nth(2),'Error message should match').toContainText('Merci de vérifier le format de votre adresse email');
     await poManager.userDetailPage.clickSauvegarderEtContinuerButton();
   });
 });

});
