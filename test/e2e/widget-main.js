var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var url = "http://localhost:"+e2ePort+"/src/widget-e2e.html";

casper.test.begin("e2e Testing - UI", {
  setUp: function(test) {
    casper.options.clientScripts = [
      "test/data/main.js",
      "test/calendar-api-mock.js"
    ];
  },
  tearDown: function(test) {},
  test: function(test) {
    casper.start();

    casper.thenOpen(url, function () {
      test.assertTitle("Google Calendar Widget", "Test page has loaded");
    });

    casper.then(function () {
      casper.waitFor(function waitForUI() {
        return this.evaluate(function countDays() {
          return document.querySelectorAll(".day").length === 7;
        });
      },
      function then() {
        test.assertElementCount(".day", 7, "Number of days showing is correct");
        test.assertElementCount(".event", 11, "Number of events showing is correct");
        test.assertSelectorHasText(".day:nth-child(1) .date", this.evaluate(function() {
          return moment().hour(6).minute(30).second(0).format("D/M/YYYY");
        }), "Date is correct");

        test.comment("Single event");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .time", this.evaluate(function() {
          return moment().hour(6).minute(30).second(0).format("h:mma") + " - " + moment().hour(7).minute(30).second(0).format("h:mma");
        }), "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .summary", "Secure welcomes Raytheon", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .location", "Gymnasium", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .description", "Gen. Johnson Col. Smith Mr. John Adams Mrs. Susan Johnson", "Description is correct");

        test.comment("Single Day Event (All Day)");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .summary", "Single Day Event (All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .location", "Conference Room B", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .description", "This occurs all day today.", "Description is correct");

        test.comment("Multi-Day Event (All Day)");
        test.comment("Today");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .summary", "Multi-Day Event (All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .location", "Everywhere", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .description", "This occurs all day today and tomorrow.", "Description is correct");

        test.comment("Tomorrow");

        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .summary", "Multi-Day Event (All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .location", "Everywhere", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .description", "This occurs all day today and tomorrow.", "Description is correct");

        test.comment("Multi-Day Event (not All Day)");
        test.comment("Today");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .summary", "Multi-Day Event (not All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .location", "Here", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .description", "This occurs today and tomorrow from 10 to 11.", "Description is correct");

        test.comment("Tomorrow");

        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .summary", "Multi-Day Event (not All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .location", "Here", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .description", "This occurs today and tomorrow from 10 to 11.", "Description is correct");

        test.comment("Error message is not displayed");

        test.assertNotVisible(".error");
      });
    });

    casper.run(function runTest() {
      test.done();
    });
  }
});
