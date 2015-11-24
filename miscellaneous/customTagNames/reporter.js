var reporter = require('../../index.js');

reporter.config(
    {labels : {
        feature: [/sprint-(\d*)/, /release-(\d)/, /area-(.*)/],
        issue: [/(bug-\d*)/]
    }}
);

module.exports = reporter;
