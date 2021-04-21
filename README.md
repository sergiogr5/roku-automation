# roku-automation

This project was created in order to demonstrate how roku applications can be automated through the driver provided by ROKU.

To install the project on your device you must follow the following steps:

1. Install node v12.19.1

2. Install npm

3. Install yarn
   `npm install --global yarn`

4. Install dependencies
   `yarn install`

5. Add the app into apps folder

6. Setup the environmental variables on the `env.config.js` file

7. To execute an specific file run the command `yarn mocha tests/scenario2.js`

8. To execute all the scenarios `yarn mocha tests/*.js`

9. If you want generate a report add the parameter `--reporter mochawesome` example: `yarn mocha tests/*.js --reporter mochawesome`
