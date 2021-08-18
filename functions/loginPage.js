/* loginPage.js contains functions for launching mercury tours website and login to the website
*/

import login from "../pageObjects/login.json";
import log4js from '../log4js/log4jsConfig';
const assert = require('assert')


//Function to check page title is appropriate
export const validateLoginPageTitle = async (page) => {
  log4js.logging().info(' ***** Welcome to the mercury tours website *****\n');

    const title = await page.title();
      expect(title).toBe('Welcome: Mercury Tours');

  };

  //Function to login to mercury tours website
  export const loginToMercuryTours = async (page, username, password) => {
    log4js.logging().info(' ***** Login to mercury tours website *****\n');
    try{
        await page.waitForSelector(login.usernameTxtbox);
    }catch(error){
            assert.fail("Error: username text box is not present in home page");
    }

    await page.fill(login.usernameTxtbox, username);
    await page.fill(login.passwordTxtbox, password);  
    await page.click(login.submitBtn);

    log4js.logging().info(' ***** Enter the sign-on credentials and submit *****\n');

  };