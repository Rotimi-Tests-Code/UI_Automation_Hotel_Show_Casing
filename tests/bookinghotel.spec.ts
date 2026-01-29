import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { BookNow } from '../pages/bookNow';
import { bookingData } from '../data/bookingdata';


test.describe('Booking Page Opens To the Home Page', () => {
    let homepage: HomePage;
    let bookNow: BookNow;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        bookNow = new BookNow(page);

        await homepage.navigate();
    });

    test('Booking a room using the book now button', async ({ page }) => {
        await bookNow.clickOnBookNowButton();
        await bookNow.fillBookingDate();
        await bookNow.checkInDate(bookingData);
        await bookNow.checkOutDate(bookingData);
        await bookNow.clickCheckAvailablityButton();
        await bookNow.clickBookNowButton();
        await bookNow.clickReserveNowButton();
        await bookNow.enterFirstName(bookingData);
        await bookNow.enterLastName(bookingData);
        await bookNow.enterEmail(bookingData);
        await bookNow.enterPhoneNumber(bookingData);
        await bookNow.clickReserveNowButton();
        await bookNow.clickReturnHomeButton();
    });
});