/* mercuryTours.test.js contains test suite for searching flights in mercury tours website
*/

import pkg from "../functions/launchInstance.js";
const { launchInstances } = pkg;
import mercurytours from '../environments/env.json';
import {takeScreenshot, removeDir} from "../functions/util.js";
import * as LoginPage from "../functions/loginPage.js";
import * as HomePage from "../functions/homePage.js";
import * as FlightPage from "../functions/flightPage.js";



const userAgent = "chromium";
const path = '/logs';

describe("Mercury Tours Website Automation", function () {
    let browser;
    let context;
    let page;
  
    beforeAll(async () => {
      removeDir(path);
      const instance = await launchInstances(userAgent);
      browser = await instance["browser"];
      context = await instance["context"];
      page = await context.newPage();
  
    });
  
    afterAll(async () => {
      await browser.close();
    });
  
    test(`should open the mercury tours login page and check the page title`, async () => {
      await Promise.all([
              page.goto(mercurytours.url),
              page.waitForNavigation(),
          ]);
      await LoginPage.validateLoginPageTitle(page);
      await takeScreenshot(page,'loginpage.png');
    });

    test(`should login to the mercury tours successfully`, async () => {
      
      await LoginPage.loginToMercuryTours(page,mercurytours.username,mercurytours.password);
      await HomePage.validateSuccessfulLogin(page)
      await takeScreenshot(page,'homepage.png');
    });

    test(`should be able to search for flights from home page and add no of passengers & trip type`, async () => {
      
      await FlightPage.selectFlights(page);
      await FlightPage.selectNoOfPassengersAndTriptype(page, "2", "oneway");
      await takeScreenshot(page,'seatavailabilitypage.png');
    });
});