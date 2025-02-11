import { Page } from "@playwright/test";
import { AmericanExpressHomePage } from "./AmericanExpressHomePage";
import { CartesAmericanExpressPage } from "./CartesAmericanExpressPage";
import { GoldAmericanExpressPage } from "./GoldAmericanExpressPage";
import { UserDetailsPage } from "./UserDetailsPage";

export class PoManager {
  page: Page;
  americanExpressHomePage: AmericanExpressHomePage;
  cartesAmericanExpressPage: CartesAmericanExpressPage;
  goldAmericanExpressPage: GoldAmericanExpressPage;
  userDetailPage: UserDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.americanExpressHomePage = new AmericanExpressHomePage(page);
    this.cartesAmericanExpressPage = new CartesAmericanExpressPage(page);
    this.goldAmericanExpressPage = new GoldAmericanExpressPage(page);
    this.userDetailPage = new UserDetailsPage(page);
  }
}
