exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel_4_API_30',
        'appium:platformVersion': '11.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './apps/myapp.apk', // path to your app
        'appium:noReset': true
    }],
    services: [
        ['appium', {
            args: {
                address: 'localhost',
                port: 4723
            }
        }]
    ],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}