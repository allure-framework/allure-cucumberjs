var logger = require('./../logger.js');

module.exports = function(){
    this.registerHandler('BeforeStep', function (step, callback) {
        logger.clearMessages();
        callback();
    });

    this.registerHandler('AfterStep', function (step, callback) {
        var loggedMessages = logger.getMessages();
        if (loggedMessages.length > 0){
            var loggedMessage = '';
            for (var i =0; i < loggedMessages.length ; i++){
                loggedMessage += loggedMessages[i] + '\n';
            }
            allure.createAttachment('Step: \"' + step.getName() + '\" logs', function() { return loggedMessage}, 'text/plain')();
        }
        callback();
    });
}