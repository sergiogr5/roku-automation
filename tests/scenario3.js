const rokuLibrary = require("../library/rokuLibrary");
const expect  = require("chai").expect;
const server = require('../drivers/server');
const config = require('../env.config');

let childProcess;
let library; 

describe('Navigate to Settings', () => {
    before(async function() {
        this.timeout(20000);
        childProcess =  await server.startServer();
        library = new rokuLibrary.Library(config.ROKU_IP);
        await library.sideLoad(config.APP_PATH, config.ROKU_USER, config.ROKU_PASS);
    });

    it('Should launch the app', async function() { 
        this.timeout(15000);
        await library.verifyIsChannelLoaded('dev');
    });

    it('Navigate to edit profile ', async function() { 
        this.timeout(20000);
        await library.sendKeys(['right', 'right', 'right', 'right', 'right','select','select']);
    });

    it('Check if edit profile page is loaded', async function() { 
        this.timeout(10000);
        const res = await library.verifyIsScreenLoaded({
            "elementData" :[{
                "using": "text",
                "value": "EDIT PROFILE"
            }]
        });
        expect(res).to.equal(true);
    });

    it('I expect to see the viewing history option', async function() { 
        this.timeout(30000);
        const res = await library.verifyIsScreenLoaded({
            "elementData" :[{
                "using": "text",
                "value": "VIEWING HISTORY"
            }]
        });
        expect(res).to.equal(true);
    });

    after(async () => {
        await library.close();
        childProcess.kill('SIGKILL');
    });
});