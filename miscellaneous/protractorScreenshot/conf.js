exports.config = {
    specs : ['protractorScreenshot.feature'],

    capabilities : {
        browserName : 'chrome'
    },
    framework : 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    directConnection : true,

    cucumberOpts: {
        require: '**/**.js'
    }

}