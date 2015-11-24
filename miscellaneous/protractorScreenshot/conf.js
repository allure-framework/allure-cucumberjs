exports.config = {
    specs : ['protractorScreenshot.feature'],
    capabilities : {
        browserName : 'chrome'
    },
    framework : 'cucumber',
    directConnection : true
}