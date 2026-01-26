import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { BookNow } from '../pages/bookNow';



test.describe('User books using the Book Now button in the Home Page', () => {
    let homepage: HomePage;
    let bookNow: BookNow;
    

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        bookNow = new BookNow(page);

        await homepage.navigate();
    })

    test('Book Now Button works as expected', async ({page}) =>  {
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