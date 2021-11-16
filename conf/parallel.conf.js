require('dotenv').config();

exports.config = {
  'framework': 'jasmine2',
  'specs': [ '../specs/todos.spec.ts' ],
  'browserstackUser': process.env.BROWSERSTACK_USERNAME,
  'browserstackKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'commonCapabilities': {
    'build': 'browserstack-build-1',
    'name': 'parallel_test',
    'browserstack.debug': 'true',
    'browserName': 'Chrome'
  },
  'multiCapabilities': [
  {
    "browser": "chrome",
    "browser_version": "95.0",
    "os": "Windows",
    "os_version": "10"
  }
  ,{
    "browser": "firefox",
    "browser_version": "94.0",
    "os": "Windows",
    "os_version": "10"
  },{
    "browser": "Safari",
    "browser_version": "14.0",
    "os" : "OS X",
    "os_Version" : "Big Sur",
  },{
    "os_version" : "10.0",
    "device" : "Samsung Galaxy S20",
    "real_mobile" : "true",
    "browserName" : "Android"
  },{
    "os_version" : "14",
    "device" : "iPhone 12 Pro Max",
    "real_mobile" : "true",
    "browserName" : "iPhone"
    }

  ],
  onPrepare() {
    //global test set-up goes here
   require('ts-node').register({
     project: require('path').join(__dirname, '../tsconfig.json') // Relative path of tsconfig.json file 
   });
  },

  // Code to mark the status of test on BrowserStack based on test assertions
  onComplete: function (passed) {
    if (!passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion has failed"}}');
    }
    if (passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "All assertions passed"}}');
    }
  }
};
// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
