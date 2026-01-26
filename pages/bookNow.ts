import { Page, Locator, expect } from "@playwright/test";


export class BookNow {
    readonly home: Page; 
    readonly bookNow: Locator;
    readonly scrollUp: Locator;
    readonly checkIn: Locator;
    readonly checkOut: Locator;
    readonly checkAvailabilty: Locator;
    readonly selectRoom: Locator; 


    constructor (home:Page) {
        this.home = home; 
        this.bookNow = home.locator('.btn.btn-primary.btn-lg');
       this.scrollUp = home.locator('h3.card-title');
       
       const dateInputs = home.locator('.react-datepicker__input-container input');
       this.checkIn = dateInputs.nth(0);
       this.checkOut = dateInputs.nth(1);
       this.checkAvailabilty = home.locator('.btn.btn-primary.w-100.py-2');
       this.selectRoom = home.locator('a.btn.btn-primary');
    }

    async clickOnBookNowButton() {
    await expect(this.bookNow).toBeVisible();
    await this.bookNow.click();

    
}
    async fillBookingDate() {
        await this.scrollUp.scrollIntoViewIfNeeded();
        await expect(this.scrollUp).toBeVisible();
        await this.scrollUp.click();
       // await this.checkOut.fill('28/01/2026');
    }

    async checkInDate() {
        await expect(this.checkIn).toBeVisible();
        await this.checkIn.click();
        await this.checkIn.fill('24/01/2026');
    }

    async checkOutDate() {
        await expect(this.checkOut).toBeVisible();
        await this.checkOut.click();
        await this.checkOut.fill('28/01/2026');
    }

    async clickCheckAvailablityButton() {
        await expect(this.checkAvailabilty).toBeVisible();
        await this.checkAvailabilty.click();
    }

    async clickBookNowButton() {
        await expect(this.selectRoom).toBeVisible();
        console.log('book now count:', await this.selectRoom.count());
        await this.selectRoom.first().click();
    }


}