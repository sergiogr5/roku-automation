const {spawn} = require('child_process');
var path = require("path");

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function startServer() {

    const driver = {
        'darwin': 'RokuWebDriver_mac',
        'linux' : 'RokuWebDriver_linux',
        'win32': 'RokuWebDriver_win.exe',
    }[process.platform];
    var absolutePath = path.resolve(`./drivers/${driver}`);

    const childProcess = spawn(absolutePath);

    await sleep(5000);
    
    return childProcess; 
 }

 module.exports.startServer = startServer;