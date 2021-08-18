/* createDir.js contains functions for creating new directory and add newly created files to it
*/

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import log4js from '../log4js/log4jsConfig';


//Function to create new folder
export const createDir = (dirPath) => {
    const path = process.cwd()+dirPath;
    if (fs.existsSync(path)) {
        fs.rmdirSync(path, {recursive: true})
      }
    fs.mkdirSync(path, {recursive: true}, (error) =>{
        if(error){
            log4js.logging().error('An error occured');
        }else{
            log4js.logging().info(' ***** Directory is created*****\n');

        }
    })
}

//Function to create files and add to the directory created above
export const createFile = (filePath, fileContent) => {
    for(let i=0;i<=2;i++){
    fs.writeFile(filePath+uuidv4()+'.txt', fileContent, (error) =>{
        if(error){
            log4js.logging().error('An error occured');
        }else{
            log4js.logging().info(' ***** File is created*****\n');

        }

    })
}
}