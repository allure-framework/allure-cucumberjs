var Reporter = require('./src/CucumberJSAllureReporter');
var Runtime = require('allure-js-commons/runtime');

global.allure = new Runtime(Reporter.allureReporter);
module.exports = Reporter;
