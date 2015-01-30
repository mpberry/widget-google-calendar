/* jshint expr: true */

(function () {
  "use strict";

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Google Calendar Settings - e2e Testing", function() {
    var calendarId = "mycalendarid",
      customURL = "http://www.test.com";

    beforeEach(function () {
      browser.get("/src/settings-e2e.html");
    });

    // Loading
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

    it("Should not load layout URL setting", function () {
      expect(element(by.id("url-entry")).isPresent()).to.eventually.be.false;
    });

    // Defaults
    it("Show Completed Events should be checked", function () {
      expect(element(by.model("settings.additionalParams.showCompleted")).isSelected()).to.eventually.be.true;
    });

    it("Scroll Type should be No", function () {
      expect(element(by.id("scroll-by")).getAttribute("value")).to.eventually.equal("none");
    });

    it("Show Date should be checked", function () {
      expect(element(by.model("settings.additionalParams.showDate")).isSelected()).to.eventually.be.true;
    });

    it("Range should be Day", function () {
      expect(element(by.id("date-range")).getAttribute("value")).to.eventually.equal("day");
    });

    it("Show Time should be checked", function () {
      expect(element(by.model("settings.additionalParams.showTime")).isSelected()).to.eventually.be.true;
    });

    it("Time Format should be 12-Hour", function () {
      expect(element(by.id("time-format")).getAttribute("value")).to.eventually.equal("12hour");
    });

    it("Show End Times should be Always", function () {
      expect(element(by.id("show-end")).getAttribute("value")).to.eventually.equal("always");
    });

    it("Show Title should be checked", function () {
      expect(element(by.model("settings.additionalParams.showTitle")).isSelected()).to.eventually.be.true;
    });

    it("Show Location should be checked", function () {
      expect(element(by.model("settings.additionalParams.showLocation")).isSelected()).to.eventually.be.true;
    });

    it("Show Description should be checked", function () {
      expect(element(by.model("settings.additionalParams.showDescription")).isSelected()).to.eventually.be.true;
    });

    // Visibility
    it("Date Format should be hidden", function () {
      expect(element(by.id("date-format")).isDisplayed()).to.eventually.be.false;
    });

    it("Date Format should be shown when Date Range is 12 Months", function () {
      element(by.cssContainingText("option", "12 Months")).click();
      expect(element(by.id("date-format")).isDisplayed()).to.eventually.be.true;
    });

    it("Should hide Date Range when Show Date is unchecked", function () {
      element(by.id("show-date")).click();
      expect(element(by.id("date-range")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Date Font when Show Date is unchecked", function () {
      element(by.id("show-date")).click();
      expect(element(by.id("date-font")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Time Format when Show Time is unchecked", function () {
      element(by.id("show-time")).click();
      expect(element(by.id("time-format")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Show End Times when Show Time is unchecked", function () {
      element(by.id("show-time")).click();
      expect(element(by.id("show-end")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Show End Times when Show Time is unchecked", function () {
      element(by.id("show-time")).click();
      expect(element(by.id("time-font")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Title Font when Show Title is unchecked", function () {
      element(by.id("show-title")).click();
      expect(element(by.id("title-font")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Location Font when Show Location is unchecked", function () {
      element(by.id("show-location")).click();
      expect(element(by.id("location-font")).isDisplayed()).to.eventually.be.false;
    });

    it("Should hide Description Font when Show Description is unchecked", function () {
      element(by.id("show-description")).click();
      expect(element(by.id("description-font")).isDisplayed()).to.eventually.be.false;
    });

    it("Should show URL when Use Default Layout is unchecked", function () {
      element(by.model("settings.additionalParams.layout.default")).click();
      expect(element(by.id("url-entry")).isDisplayed()).to.eventually.be.true;
    });

    // Validity
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

    it("ng-invalid should be true when Use Default Layout is unchecked", function () {
      element(by.model("settings.additionalParams.layout.default")).click();
      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).to.eventually.be.true;
    });

    it("ng-invalid should be false when Use Default Layout is unchecked and a URL is entered", function () {
      element(by.css("input[name=calendar]")).sendKeys(calendarId);
      element(by.model("settings.additionalParams.layout.default")).click();
      element(by.model("url")).sendKeys(customURL);
      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).to.eventually.be.false;
    });

    // Saving
    it("Should correctly save settings", function (done) {
      var settings = {
        "params": {
          "layoutURL": ""
        },
        "additionalParams": {
          "calendar": calendarId,
          "showCompleted": true,
          "scroll": {
            "by": "none",
            "speed": "medium",
            "pause": 5
          },
          "showDate": true,
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
          "showTime": true,
          "timeFormat": "12hour",
          "showEnd": "always",
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
          "showTitle": true,
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
          "showLocation": true,
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
          "showDescription": true,
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
          },
          "layout": {
            "default": false,
            "customURL": customURL
          }
        }
      };

      element(by.model("settings.additionalParams.calendar")).sendKeys(calendarId);
      element(by.model("settings.additionalParams.layout.default")).click();
      element(by.model("url")).sendKeys(customURL);
      element(by.id("save")).click();

      expect(browser.executeScript("return window.result")).to.eventually.deep.equal({
        "params": customURL + "?",
        "additionalParams": JSON.stringify(settings.additionalParams)
      });
    });
  });
})();
