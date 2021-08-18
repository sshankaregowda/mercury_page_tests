/* flightPage.js contains functions for selecting passengers, trip type and checking seat availability
*/

import flights from "../pageObjects/flight.json";
import home from "../pageObjects/home.json";
import log4js from '../log4js/log4jsConfig';
const assert = require('assert')

//Function to select Flights from menu
export const selectFlights = async (page) => {
    log4js.logging().info(' ***** Select Flights from mercury tours menu*****\n');

    try{
        await page.waitForSelector(home.flightsLink);
    }catch(error){
            assert.fail("Error: flights link is not present in mercury tours website");
    }

    const menuDetails = await page.$$(home.flightsLink);
    for (let index = 0; index < menuDetails.length; index++) {
      const menu = menuDetails[index];
      const menuName = await menu.innerText();
       if(menuName === "Flights"){
        await menu.click();
        log4js.logging().info(' ***** Flights is selected from menu *****\n');
        break;
       }
    }
    return;
};

//Function to select no of passengers, trip type and to check seat availability
export const selectNoOfPassengersAndTriptype = async (page, noOfPassengers,tripType) => {
    await page.waitForTimeout(2000);
    try{
        
      await page.waitForSelector(flights.passengersDropdown);
    }catch(error){
            assert.fail("Error: passengers dropdown is not present in mercury tours flight page");
    }   

    log4js.logging().info(' ***** Selecting no of passengers and trip type *****\n');

    await page.selectOption(flights.passengersDropdown, noOfPassengers)
    await page.check('//input[@value="'+tripType+'"]');
    await page.click(flights.continueBtn);
    await page.waitForTimeout(2000);

    const noOfSeats = await page.$(flights.noOfSeats);
    const noOfSeatsTxt = await noOfSeats.innerText();

    log4js.logging().info(' ***** Checking the flight availability - no of seats*****\n');

    if(/\d/g.test(noOfSeatsTxt)){
      expect(typeof noOfSeatsTxt.match(/\d+/)).toBe('number');
      log4js.logging().info(' ***** Seats are available *****\n');
    }else{
        log4js.logging().info(' ***** No Seats/Flights are available due to covid-19*****\n');
    }
};