module.exports = function(){

    this.registerHandler('StepResult', function (event, callback) {
        var stepResult = event.getPayloadItem('stepResult');

        if (stepResult.getStatus() == 'failed'){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function(){ return new Buffer(png, 'base64')}, 'image/png')();
                callback();
            });

        } else {
            callback();
        }
    });
}