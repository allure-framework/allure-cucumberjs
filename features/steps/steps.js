module.exports = function(){
    this.Given('given step', function(callback){
        callback()
    });

    this.When('when step', function (callback){
        callback();
    });

    this.Then('failed step', function(callback){
        throw new Error('Step failed on purpose');
    });

    this.Then('passed step', function(callback){
        callback();
    });

    this.Then('skipped step', function(callback){
        callback();
    });

    this.Then('pending step', function(callback){
        callback.pending();
    });

    this.Then('exception is thrown', function(){
        throw new Error('Exception');
    });

    var first, second, sum;

    this.Given('there is $a and $b', function(a,b, callback){
        first = Number.parseInt(a);
        second = Number.parseInt(b);
        callback();
    });

    this.When('they are added', function(callback){
        sum = first + second;
        callback();
    });

    this.Then('result should be equal $result', function(result, callback){
        if (result != sum) throw new Error('wrong number: ' + sum + " is not equal to expected: " + result);
        callback();
    });

    this.Given('dataTable:',function(table, callback){
        callback();
    });

    this.Given('docString:',function(docString, callback){
        callback();
    });

    function addSubSteps(number){
        for (var i =0; i < number ; i++){
            allure.createStep('SubStep No.: ' + i, function() {})();
        }
    }

    this.Given('given step with $number sub steps',function(number, callback){
        addSubSteps(number);
        callback();
    });

    this.When('when step adds $number sub step', function(number,callback){
        addSubSteps(number);
        callback();
    });

    this.Then('passed step adds $number more', function(number,callback){
        addSubSteps(number);
        callback();
    });
}