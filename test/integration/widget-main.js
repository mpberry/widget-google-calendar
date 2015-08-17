var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var url = "http://localhost:"+e2ePort+"/src/widget-e2e.html";

casper.test.begin("e2e Testing - UI", {
  setUp: function(test) {
    casper.options.clientScripts = [
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
        var isEventOver = false,
          todaysEvents = 0,
          totalEvents = 0;

        isEventOver = this.evaluate(function checkEventIsOver() {
          return moment().isAfter(moment().hour(7).minute(30).second(0));
        });

        // Single event for today has already completed.
        if (isEventOver) {
          todaysEvents = 3;
          totalEvents = 10;
        }
        else {
          todaysEvents = 4;
          totalEvents = 11;
        }

        test.assertElementCount(".day", 7, "Total number of days");
        test.assertElementCount(".day:nth-child(1) .event", todaysEvents, "Total number of today's events");
        test.assertElementCount(".event", totalEvents, "Total number of all events");

        test.assertSelectorHasText(".day:nth-child(1) .date", this.evaluate(function() {
          return moment().hour(6).minute(30).second(0).format("D/M/YYYY");
        }), "Today's date");


        test.comment("Multi-Day Event (All Day) - Today");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .time", "", "Time");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .summary", "Multi-Day Event (All Day)", "Summary");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .location", "Everywhere", "Location");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .description", "This occurs all day today and tomorrow.", "Description");


        test.comment("Single Day Event (All Day) - Today");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .time", "", "Time");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .summary", "Single Day Event (All Day)", "Summary");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .location", "Conference Room B", "Location");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .description", "This occurs all day today.", "Description");


        test.comment("Multi-Day Event (All Day) - Tomorrow");

        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .time", "", "Time");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .summary", "Multi-Day Event (All Day)", "Summary");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .location", "Everywhere", "Location");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .description", "This occurs all day today and tomorrow.", "Description");


        test.comment("Multi-Day Event (not All Day) - Tomorrow");

        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .time", "", "Time");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .summary", "Multi-Day Event (not All Day)", "Summary");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .location", "Here", "Location");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .description", "This occurs today and tomorrow from 10 to 11.", "Description");


        test.comment("Single event - One week later");

        test.assertSelectorHasText(".day:nth-child(3) .event:nth-child(1) .time", this.evaluate(function() {
          return moment().hour(16).minute(0).second(0).format("h:mma") + " - " + moment().hour(19).minute(0).second(0).format("h:mma");
        }), "Time");

        test.assertSelectorHasText(".day:nth-child(3) .event:nth-child(1) .summary", "Football Game", "Summary");
        test.assertSelectorHasText(".day:nth-child(3) .event:nth-child(1) .location", "Arena", "Location");
        test.assertSelectorHasText(".day:nth-child(3) .event:nth-child(1) .description", "Our weekly football game. All proceeds go to charity.", "Description");

        test.assertNotVisible(".error", "No error message is shown");
      });
    });

    casper.run(function runTest() {
      test.done();
    });
  }
});
