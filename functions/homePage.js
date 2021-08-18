/* homePage.js contains functions for validating successful login and landing to home page
*/

import home from "../pageObjects/home.json";
import log4js from '../log4js/log4jsConfig';
const assert = require('assert')



//Function to check if user is successfully logged in and landed home page
export const validateSuccessfulLogin = async (page) => {
    try{
        await page.waitForSelector(home.loginSuccessMsg);
    }catch(error){
            assert.fail("Error: user is not logged in to mercury tours website");
    }

    log4js.logging().info(' ***** Logged in to mercury tours website and landed home page*****\n');


    const loginSuccessMsg = await page.evaluate((locator) => {
        const successMsg = document.querySelector(locator).innerHTML;
        return successMsg;
     },home.loginSuccessMsg);
    
    expect(loginSuccessMsg).toBe('Login Successfully');
    

  };