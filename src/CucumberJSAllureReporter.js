var Allure = require('allure-js-commons');
var allure = new Allure();

var configuration = {};

function Reporter(){

    allure.setOptions({targetDir: configuration.targetDir ? configuration.targetDir : 'allure-results'});

    var lastResults = null;
    var failedResult = null;
    var isScenarioFailed = false;

    this.registerHandler('BeforeFeature', function(event, callback){
        var feature = event.getPayloadItem('feature');
        allure.startSuite(feature.getName());
        callback();
    });

    this.registerHandler('AfterFeature', function(event, callback){
        allure.endSuite();
        callback();
    });

    this.registerHandler('BeforeScenario', function (event, callback) {
        failedResult = null;
        isScenarioFailed = false;

        var scenario = event.getPayloadItem('scenario');
        allure.startCase(scenario.getName());

        var currentTest = allure.getCurrentSuite().currentTest;
        currentTest.setDesctiption(scenario.getDescription());

        getLabels(scenario).forEach(function (label) {
            currentTest.addLabel(label.name, label.value);
        });

        callback();
    });

    this.registerHandler('AfterScenario', function (event, callback) {
        var scenario = event.getPayloadItem('scenario');
        allure.endCase(isScenarioFailed ? "failed" : getStepResult(lastResults),
                       isScenarioFailed ? getScenarioFailure(failedResult) : getScenarioFailure(lastResults));
        callback();
    });

    this.registerHandler('BeforeStep', function (event, callback) {
        lastResults = null;

        var step = event.getPayloadItem('step');
        allure.startStep(step.getName());
        callback();
    });

    this.registerHandler('AfterStep', function (event, callback) {
        var step = event.getPayloadItem('step');

        if (step && step.hasDataTable == 'function' && step.hasDataTable()){
            var rawTable = step.getAttachment().raw();
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

        if (step && step.hasDocString == 'function' && step.hasDocString()){
            allure.addAttachment('Step: \"' + step.getName() + '\" docString', step.getAttachment().getContents(), 'text/plain');
        }

        var stepResult = getStepResult(lastResults);

        if (stepResult === "failed"){
            isScenarioFailed = true;
            failedResult = lastResults;
        }

        allure.endStep(stepResult);
        callback();
    });

    this.registerHandler('StepResult', function (event, callback) {
        lastResults = event.getPayloadItem('stepResult');
        callback();
    });
}

function getStepResult(stepResult){

    switch (stepResult.getStatus()){
        case 'passed' :
            return 'passed';
        case 'failed' :
            return 'failed';
        case 'skipped':
        case 'pending' :
            return 'pending';
        case 'undefined':
            return 'broken';
        default:
            return 'unknown';
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
