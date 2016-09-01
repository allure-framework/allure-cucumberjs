var Allure = require('allure-js-commons');
var allure = new Allure();

var configuration = {};

function Reporter(){

    allure.setOptions({targetDir: configuration.targetDir ? configuration.targetDir : 'allure-results'});

    var lastResults = null;
    var failedResult = null;
    var isScenarioFailed = false;

    this.registerHandler('BeforeFeature', function(feature, callback){
        allure.startSuite(feature.getName());
        callback();
    });

    this.registerHandler('AfterFeature', function(feature, callback){
        allure.endSuite();
        callback();
    });

    this.registerHandler('BeforeScenario', function (scenario, callback) {
        failedResult = null;
        isScenarioFailed = false;

        allure.startCase(scenario.getName());

        var currentTest = allure.getCurrentSuite().currentTest;
        currentTest.setDescription(scenario.getDescription());

        getLabels(scenario).forEach(function (label) {
            currentTest.addLabel(label.name, label.value);
        });

        callback();
    });

    this.registerHandler('AfterScenario', function (scenario, callback) {
        allure.endCase(isScenarioFailed ? "failed" : getStepResult(lastResults),
                       isScenarioFailed ? getScenarioFailure(failedResult) : getScenarioFailure(lastResults));
        callback();
    });

    this.registerHandler('BeforeStep', function (step, callback) {
        lastResults = null;

        allure.startStep(step.getName());
        callback();
    });

    this.registerHandler('AfterStep', function (step, callback) {
        var arguments = step.getArguments();

        if (arguments.length > 0){
            for (var argument of arguments){
                if (argument.getType() == 'DataTable'){
                    var rawTable = argument.raw();
                    var cellLength = [];
                    var result = '';

                    for (var column = 0; column < rawTable[0].length; column++){
                        cellLength[column] = 0;
                        for (var row = 0; row < rawTable.length; row++){
                            if (cellLength[column] < rawTable[row][column].length) {
                                cellLength[column] = rawTable[row][column].length;
                            }
                        }
                    }

                    for (var row =0; row < rawTable.length; row++){
                        result += "| ";
                        for (var column = 0; column < rawTable[row].length; column++){
                            result += rawTable[row][column];
                            for (var i =0; i < (cellLength[column] - rawTable[row][column].length); i++){
                                result += ' ';
                            }
                            result += " |";
                        }
                        result += "\n";
                    }

                    allure.addAttachment('Step: \"' + step.getName() + '\" dataTable', result, 'text/plain');
                }

                if (argument.getType() == 'DocString'){
                    allure.addAttachment('Step: \"' + step.getName() + '\" docString', argument.getContent(), 'text/plain');
                }
            }

        }

        var stepResult = getStepResult(lastResults);

        if (stepResult === "failed"){
            isScenarioFailed = true;
            failedResult = lastResults;
        }

        allure.endStep(stepResult);
        callback();
    });

    this.registerHandler('StepResult', function (stepResult, callback) {
        lastResults = stepResult;
        callback();
    });
}

function getStepResult(stepResult){

    switch (stepResult.getStatus()){
        case 'passed' :
            return 'passed';
        case 'failed' :
            var error = stepResult.getFailureException();
            if (error && (error.message === 'Step cancelled' || error.message === 'Test cancelled')){
                return 'skipped';
            } else {
                return 'failed';
            }
        case 'skipped':
            return 'skipped';
        case 'pending' :
            return 'pending';
        case 'undefined':
            return 'broken';
        default:
            return 'broken';
    }
}

function getLabels(object){
    var tags = object.getTags();
    if (tags != null && tags != undefined){
        var labels = [];
        tags.forEach(function (tag) {

            var foundInCustoms = false;

            if (configuration.labels) {
                MAIN:
                for (var labelName in configuration.labels){
                    for (var labelRegExp = 0; labelRegExp < configuration.labels[labelName].length; labelRegExp++){
                        if (tag.getName().search(configuration.labels[labelName][labelRegExp]) >= 0){
                            var label = tag.getName().match(configuration.labels[labelName][labelRegExp])[1];
                            labels.push({name: labelName, value: label});
                            foundInCustoms = true;
                            break MAIN;
                        }
                    }
                }
            }

            if (!foundInCustoms) {
                var label = tag.getName().replace(/[@]/, '').split(':');
                label.length == 2
                    ?
                    labels.push({name: label[0], value: label[1]})
                    :
                    console.log('Wrong label: ' + tag.getName());
            }
        });
        return labels;
    } else {
        return [];
    }
}

function getScenarioFailure(stepResult){

    switch (stepResult.getStatus()){
        case 'passed' :
            return null;
        case 'failed' :
            return stepResult.getFailureException();
        case 'undefined':
            return {message: 'Step not defined', 'stack-trace' : ''};
        case 'pending':
            return {message: 'Step not implemented', 'stack-trace' : ''};
        case 'skipped':
            return {message : 'Step not executed', 'stack-trace' : ''};
        default:
            return {message : 'Unknown problem', 'stack-trace' : ''};
    }
}

Reporter.config = function(params){
    configuration = params;
};

module.exports = Reporter;
module.exports.allureReporter = allure;