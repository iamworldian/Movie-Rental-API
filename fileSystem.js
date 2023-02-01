const fs = require('node:fs/promises');

// Scaffold
const fileModule = {};

fileModule.readFile = async (filePath) => {
    try{
        const contents = await fs.readFile(filePath , {encoding : 'utf8'});
        return contents;
    }catch (err) {
        console.log(err);
    }
}

fileModule.writeFile = async (filePath , data) => {
    try{
        await fs.writeFile(filePath , data);
    } catch (err) {
        console.log(err);
    }
}   


module.exports = fileModule;