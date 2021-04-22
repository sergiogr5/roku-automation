const rokuLibrary = require("../library/rokuLibrary");
const expect  = require("chai").expect;
const server = require('../drivers/server');
const config = require('../env.config');

let childProcess;
let library; 


describe('Play Authenticated Live Video (Logged In / Authenticated)', () => {
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

    it('Navigate to tv provider', async function() { 
        this.timeout(20000);
        await library.sendKeys(['right', 'right', 'right', 'right', 'right','select','down','down','select']);
    });

    it('Login using a valid account', async function() { 
        this.timeout(50000);
        let code = '';
        const element = await library.getElement({
            "elementData":[{
                "using": "tag",
                "value": "LayoutGroup"
            },{
                "using": "attr",
                "attribute": "name",
                "value": "codeGroup"
            }]
        });
        const children = library.getChildNodesByTag(element, 'label');

        await children.forEach(element=> code += library.getAttribute(element, 'text'));

        require('child_process').execSync(`CODE="${code}" npx wdio run wdio.conf.js`);
    
        await library.sleep(3000);

    });

    it('Go to home', async function() { 
        this.timeout(20000);
        await library.sendKeys(['back', 'left', 'left', 'left', 'left','left','select']);
    });

    it('Check if list of videos is present', async function() { 
        this.timeout(10000);
        const res = await library.verifyIsScreenLoaded({'elementData': [{'using': 'tag', 'value': 'HomeMovingFocusRowList'}]});
        expect(res).to.equal(true);
    });

    it('Select a video in the carousel', async function() { 
        this.timeout(30000);
        while(!await library.verifyIsScreenLoaded({"elementData" :[{ "using": "text", "value": "WATCH NOW"}]})) {
            await library.sendKey('right', 1);
        }
        await library.sendKey('select', 0.5);
    });

    it('Check video has started', async function() { 
        this.timeout(10000);
        const res = await library.verifyIsPlaybackStarted();
        expect(res).equal(true);
    });

    it('Pause video after 1 minute', async function() { 
        this.timeout(90000);
        await library.sleep(60000);
        await library.sendKey('play', 1);
        const res = await library.verifyIsScreenLoaded({
            "elementData":[{
                "using": "tag",
                "value": "Poster"
            },{
                "using": "attr",
                "attribute": "name",
                "value": "currentPosition"
            }]
        });
        expect(res).equal(true);
    });

    it('Check the position time', async function() { 
        this.timeout(10000);
        let time = library.getTimer();
        expect(time).greaterThan(55000);
    });


    after(async () => {
        await library.close();
        childProcess.kill('SIGKILL');
    });
});