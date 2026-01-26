import { Page, Locator, expect } from "@playwright/test";
import { bookingData } from "../data/bookingdata";


type bookingData = {
    checkInDate: string;
    checkOutDate: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string; 
}; 

export class BookNow {
    readonly home: Page; 
    readonly bookNow: Locator;
    readonly scrollUp: Locator;
    readonly checkIn: Locator;
    readonly checkOut: Locator;
    readonly checkAvailabilty: Locator;
    readonly selectRoom: Locator; 
    readonly reserveNow:Locator; 
    readonly firstName: Locator; 
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly returnHome: Locator;


    constructor (home:Page) {
        this.home = home; 
        this.bookNow = home.locator('.btn.btn-primary.btn-lg');
       this.scrollUp = home.locator('h3.card-title');
       const dateInputs = home.locator('.react-datepicker__input-container input');
       this.checkIn = dateInputs.nth(0);
       this.checkOut = dateInputs.nth(1);
       this.checkAvailabilty = home.locator('.btn.btn-primary.w-100.py-2');
       this.selectRoom = home.locator('a[href="/reservation/1?checkin=2026-01-24&checkout=2026-01-28"]');
       this.reserveNow = home.locator('.btn.btn-primary.w-100.mb-3');
       this.firstName = home.locator('input.form-control.room-firstname');
       this.lastName = home.locator('input.form-control.room-lastname');
       this.email = home.locator('input.form-control.room-email');
       this.phone = home.locator('input.form-control.room-phone');
       this.returnHome = home.locator('.btn.btn-prinary.w-100.mb-3.mt-3');


        
    }

    async clickOnBookNowButton(data: bookingData) {
    await expect(this.bookNow).toBeVisible();
    await this.bookNow.click();

    

}
    async fillBookingDate() {
        await this.scrollUp.scrollIntoViewIfNeeded();
        await expect(this.scrollUp).toBeVisible();
        await this.scrollUp.click();
    }

    async checkInDate(data: bookingData) {
        const {checkInDate} = data
        await expect(this.checkIn).toBeVisible();
        await this.checkIn.click();
        await this.checkIn.fill(checkInDate);
    }

    async checkOutDate(data: bookingData) {
        const {checkOutDate} = data
        await expect(this.checkOut).toBeVisible();
        await this.checkOut.click();
        await this.checkOut.fill(checkOutDate);
    }

    async clickCheckAvailablityButton() {
        await expect(this.checkAvailabilty).toBeVisible();
        await this.checkAvailabilty.click();
    }

    async clickBookNowButton() {
        await expect(this.selectRoom).toBeVisible();
        await this.selectRoom.first().click();
    }

    async clickReserveNowButton() {
        await expect(this.reserveNow).toBeVisible();
        await this.reserveNow.click();
    }

    async enterFirstName(data: bookingData) {
        const{firstName} = data;
        await expect(this.firstName).toBeVisible();
        await this.firstName.click();
        await this.firstName.fill(firstName);
    }

    async enterLastName(data = bookingData) {
        const{lastName} = data;
        await expect(this.lastName).toBeVisible();
        await this.lastName.click();
        await this.lastName.fill(lastName);
    }

    async enterEmail(data = bookingData) {
        const{email} = data
        await expect(this.email).toBeVisible();
        await this.email.click();
        await this.email.fill(email);
    }

    async enterPhoneNumber(data = bookingData) {
        const{phone} = data
        await expect(this.phone).toBeVisible();
        await this.phone.click();
        await this.phone.fill(phone);
    }

    async clickReturnHomeButton() {
        await expect(this.returnHome).toBeVisible();
        await this.returnHome.click();
    }


    


}