/* createDir.test.js contains test suite for create new directory and adding newly created files to it
*/
import * as create from "../functions/createDir.js";

const path = '/newFolder/';
describe("Create folder and add files to it", function () {
  
    test(`should create a new folder`, async () => {
     await create.createDir(path);
    });

    test(`should open the mercury tours login page and check the page title`, async () => {
        await create.createFile( process.cwd()+path,'create new file');
    });
   

});