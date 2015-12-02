# Allure report version supported : 1.4.15

## HOW TO USE IT?

Add `reporter.js` file in feature packages with:

```js
var reporter = require('cucumberjs-allure-reporter');
reporter.config(
    {...}
);
module.exports = reporter;
```

Supported configuration keys:
* *targetDir* - directory where allure will save results xml's
* *labels* - custom label matchers, example:

    ```js
    labels : {
            feature: [/sprint-(\d*)/, /release-(\d)/, /area-(.*)/],
            issue: [/(bug-\d*)/]
        }
    ```
   
Possible labels:
* feature
* story
* severity
* language
* framework
* issue
* testId
* host
* thread    
    
## Generate HTML report from Allure results

The Reporter will generate xml files inside of a `targetDir`, then we need to generate HTML out of them. You can
use Maven for that. Copy ready-to-use `pom.xml` from `node_modules/cucumberjs-allure-reporter` and run:

```mvn site -Dallure.results_pattern=allure-results```

It will put HTMLs into `target/site/allure-maven-plugin` folder. To serve them via localhost:1234 use:

```mvn jetty:run -Djetty.port=1234```


Otherwise choose [one of other ways to generate HTML](https://github.com/allure-framework/allure-core/wiki#generating-a-report).

## For Developers 
### Run test examples with:
```./node_modules/.bin/cucumber.js features/<FEATURE_NAME>.feature```
   
   Available tests:
   * basic -> basic test results
   * description -> scenario description test
   * label -> cucumber tags (currently labels are not visible in generated report ...)
   * exception -> test throws exception
   * attachments -> docStrings and dataTable tests
   * scenarioOutline -> scenario outline tests
   * subSteps -> steps add sub steps using allure object
   
or run everything with:
   ```./node_modules/.bin/cucumber.js features/```   
   

To check protractor screenshot test install `protractor` and `protractor-cucumber-framework` and then run tests:
```./node_modules/protractor/bin/protractor miscellaneous/protractorScreenshot/conf.js```

To check basic logging run:
```./node_modules/.bin/cucumber.js miscellaneous/logging```

To check basic configuration run:
```./node_modules/.bin/cucumber.js miscellaneous/configuration```

To check custom tags run:
```./node_modules/.bin/cucumber.js miscellaneous/customTagNames```

## Release notes
02/12/2015 version 1.0.0
* plugin updated to work with cucumber 0.9.1

01/09/2015 version 0.0.1
* first release