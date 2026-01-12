const { remote } = require('webdriverio');

let driver;

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings'
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  driver = await remote(wdOpts);
  
  try {
    // Get device info
    const session = await driver.getSession();
    console.log('Session ID:', session);
    
    // Get current activity
    const activity = await driver.getCurrentActivity();
    console.log('Current Activity:', activity);
    
    // Get device time
    const time = await driver.getDeviceTime();
    console.log('Device Time:', time);
    
  } finally {
    await driver.deleteSession();
  }
}

runTest().catch(console.error);