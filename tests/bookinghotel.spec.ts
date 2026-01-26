import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { BookNow } from '../pages/bookNow';



test.describe('Booking Page Opens To the Home Page', () => {
    let homepage: HomePage;
    let bookNow: BookNow;
    

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        bookNow = new BookNow(page);

        await homepage.navigate();
    })

    test('Booking a room using the book now button', async ({page}) =>  {
        await bookNow.clickOnBookNowButton();
        await bookNow.fillBookingDate();
        await bookNow.checkInDate();
        await bookNow.checkOutDate();
        await bookNow.clickCheckAvailablityButton();
        await bookNow.clickBookNowButton();
        await bookNow.clickReserveNowButton();
        await bookNow.enterFirstName();
        await bookNow.enterLastName();
        await bookNow.enterEmail();
        await bookNow.enterPhoneNumber();
        await bookNow.clickReserveNowButton();
        await bookNow.clickReturnHomeButton();
    })
})