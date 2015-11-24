var logger = require('../logger.js');

module.exports = function(){

    this.Given('I log $amount messages', function(amount, callback) {

        while (amount-- > 0) {
            logger.logMessage("Got: " + amount);
        }
        callback();
    });
}