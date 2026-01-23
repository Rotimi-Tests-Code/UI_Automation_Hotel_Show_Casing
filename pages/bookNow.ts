import { Page, Locator, expect } from "@playwright/test";


export class BookNow {
    readonly home: Page; 
    readonly bookNow: Locator;
    readonly checkOut: Locator;


    constructor (home:Page) {
        this.home = home; 
        this.bookNow = home.locator('.btn.btn-primary.btn-lg');
        this.checkOut = home.getByLabel('#checkout');
    }

    async clickOnBookNowButton() {
    await expect(this.bookNow).toBeVisible();
    await this.bookNow.click();

    
}
    async fillBookingDate() {
        await this.checkOut.scrollIntoViewIfNeeded();
        await expect(this.checkOut).toBeVisible();
        await this.checkOut.click();
        await this.checkOut.fill('28/01/2026');
    }

}

