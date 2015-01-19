(function(window) {

  "use strict";

  window.gadget = window.gadget || {};

  window.gadget.settings = {
    "params": {
      "layoutURL": ""
    },
    "additionalParams": {
      "calendar": "calendarID",
      "showCompleted": false,
      "scroll": {
        "by": "none",
        "speed": "medium",
        "pause": 5
      },
      "showDate": true,
      "dateRange": "12months",
      "dateFormat": "D/M/YYYY",
      "dateFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "showTime": true,
      "timeFormat": "12hour",
      "showEnd": "always",
      "timeFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "showTitle": true,
      "titleFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "showLocation": true,
      "locationFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "showDescription": true,
      "descriptionFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "18",
        "bold": false,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "layout": {
        "default": true,
        "customURL": ""
      }
    }
  };
})(window);
