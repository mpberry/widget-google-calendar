/* jshint expr: true */

(function () {
  "use strict";

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Google Calendar Settings - e2e Testing", function() {
    var calendarId = "mycalendarid";

    beforeEach(function () {
      browser.get("/src/settings-e2e.html");
    });

    it("Should load scroll setting", function () {
      expect(element(by.id("scroll-by")).isPresent()).to.eventually.be.true;
    });

    it("Should load date font setting", function () {
      expect(element(by.css("#date-font font-picker")).isPresent()).to.eventually.be.true;
    });

    it("Should load time font setting", function () {
      expect(element(by.css("#time-font font-picker")).isPresent()).to.eventually.be.true;
    });

    it("Should load title font setting", function () {
      expect(element(by.css("#title-font font-picker")).isPresent()).to.eventually.be.true;
    });

    it("Should load location font setting", function () {
      expect(element(by.css("#location-font font-picker")).isPresent()).to.eventually.be.true;
    });

    it("Should load description font setting", function () {
      expect(element(by.css("#description-font font-picker")).isPresent()).to.eventually.be.true;
    });

    it("Scroll Type should be No", function () {
      expect(element(by.id("scroll-by")).getAttribute("value")).to.eventually.equal("none");
    });

    it("Date Range should be Day", function () {
      expect(element(by.id("date-range")).getAttribute("value")).to.eventually.equal("day");
    });

    it("Time Format should be 12-Hour", function () {
      expect(element(by.id("time-format")).getAttribute("value")).to.eventually.equal("12hour");
    });

    it("Show End Times should be Always", function () {
      expect(element(by.id("show-end")).getAttribute("value")).to.eventually.equal("always");
    });

    it("Show Completed Events should be checked", function () {
      expect(element(by.model("settings.additionalParams.showCompleted")).isSelected()).to.eventually.be.true;
    });

    it("Should hide date format", function () {
      expect(element(by.id("date-format")).isDisplayed()).to.eventually.be.false;
    });

    it("ng-invalid should be true", function () {
      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).to.eventually.be.true;
    });

    it("ng-valid should be false", function () {
      expect(element(by.css("form[name=settingsForm].ng-valid")).isPresent()).to.eventually.be.false;
    });

    it("Calendar ID error should be shown", function () {
      expect(element(by.css(".text-danger")).isDisplayed()).to.eventually.be.true;
    });

    it("Save button should be disabled", function () {
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).to.eventually.be.true;
    });

    it("Date Format should be shown when Date Range is 12 Months", function () {
      element(by.cssContainingText("option", "12 Months")).click();
      expect(element(by.id("date-format")).isDisplayed()).to.eventually.be.true;
    });

    it("ng-invalid should be false when a Calendar ID is entered", function () {
      element(by.css("input[name=calendar]")).sendKeys(calendarId);
      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).to.eventually.be.false;
    });

    it("ng-valid should be true when a Calendar ID is entered", function () {
      element(by.css("input[name=calendar]")).sendKeys(calendarId);
      expect(element(by.css("form[name=settingsForm].ng-valid")).isPresent()).to.eventually.be.true;
    });

    it("Calendar ID error should be hidden when a Calendar ID is entered", function () {
      element(by.css("input[name=calendar]")).sendKeys(calendarId);
      expect(element(by.css(".text-danger")).isDisplayed()).to.eventually.be.false;
    });

    it("Save button should be enabled when a Calendar ID is entered", function () {
      element(by.css("input[name=calendar]")).sendKeys(calendarId);
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).to.eventually.be.false;
    });

    it("Should correctly save settings", function (done) {
      var settings = {
        "params": {},
        "additionalParams": {
          "calendar": calendarId,
          "scroll": {
            "by": "none",
            "speed": "medium",
            "pause": 5
          },
          "dateRange": "day",
          "dateFont": {
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "size": "20",
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "timeFont": {
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "size": "20",
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "timeFormat": "12hour",
          "showEnd": "always",
          "showCompleted": true,
          "titleFont": {
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family":"Verdana"
            },
            "size": "20",
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "locationFont": {
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "size": "20",
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "descriptionFont": {
            "size": "18",
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "bold": false,
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          }
        }
      };

      element(by.css("input[name=calendar]")).sendKeys(calendarId);
      element(by.id("save")).click();

      expect(browser.executeScript("return window.result")).to.eventually.deep.equal({
        "additionalParams": JSON.stringify(settings.additionalParams),
        "params": ""
      });
    });
  });
})();
