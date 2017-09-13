/*
 * Selenium WebDriver JavaScript test with Mocha and NodeJS
 * 
 * Start with: SELENIUM=PATH_TO_SELENIUM_JAR/selenium-server-standalone-2.31.0.jar 


 mocha -t 10000 -R list mocha_browser_auto_with_chrome_v1.js
 


 * 
 * Download selenium-server-standalone-2.31.0.jar from https://selenium.googlecode.com/files/selenium-server-standalone-2.31.0.jar
 
 'sudo su' 
 'npm install -g colors mocha selenium-webdriver'

 * 
 * http://visionmedia.github.io/mocha/
 * https://code.google.com/p/selenium/wiki/WebDriverJs
 * https://github.com/marak/colors.js/
 * 
 * @author István Pató
 */
require('dotenv').config();
var assert = require('assert')
        , fs = require('fs')
        , webdriver = require('selenium-webdriver')
        , colors = require('colors');
        

var driver;

// run it once before tests
before(function(done) {
    driver = new webdriver
            .Builder()
            // .usingServer('http://localhost:4444/wd/hub')
            .usingServer(process.env.SELENIUM_URL)
            .withCapabilities(
            {
                'browserName': 'chrome'
            })
            .build();

    // error handling - if you want do st
    process.on('uncaughtException', function(err) {
        console.log("My error handler... " + err);

        if (driver) {
            //recording screenshot
            driver.takeScreenshot().then(function(img) {
                fs.writeFileSync("screenshots/test.png", new Buffer(img, 'base64'));
            });
        }
    });

    // open start page
    driver.get('http://google.com').then(function() {
        console.log("open google.com...");
        done();
    });

});

// run it once after tests
after(function(done) {
    // works with promise
    driver.quit().then(done);
});

// tests
describe('Google Search', function() {
    it('should work', function(done) {

        /*var searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('webdriver\n').then(function() {
            return searchBox.getAttribute('value');
        }).then(function(value) {
            assert.equal(value, 'webxdriver');
            done();
        });*/

        driver.get('http://www.google.com');
        var searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('simple programmer');
        searchBox.getAttribute('value').then(function(value) {
                assert.equal(value, 'simple programmer');
                done();
        });

                
    });
});