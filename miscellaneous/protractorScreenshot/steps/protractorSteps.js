module.exports = function(){
    this.Given('I\'m on AngularJS page', function(){
        browser.get('https://angularjs.org/');
    });

    this.Then('failed step', function(callback){
        callback.fail(new Error('failed'));
    });
}