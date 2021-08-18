/* util.js contains common reusable functions
*/
import log4js from '../log4js/log4jsConfig';
import fs from 'fs';


//Function to capture screenshot
const takeScreenshot = async (page,screenshotName) => {
    await page.screenshot({ path: `./screenshots/${screenshotName}`, fullPage: false });
}

const removeDir = (dirPath) => {
    const path = process.cwd()+dirPath;
    if (fs.existsSync(path)) {
        fs.rmdirSync(path, {recursive: true})
    }else{
        log4js.logging().info(' ***** Directory does not exist*****\n');
    }
}

export { takeScreenshot, removeDir}

