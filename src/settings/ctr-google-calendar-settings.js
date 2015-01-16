angular.module("risevision.widget.googleCalendar.settings")
  .controller("calendarSettingsController", ["$scope",
    function ($scope) {
      $scope.showDateFormat = false;
      $scope.dateFormatValue = "D/M/YYYY";
      $scope.currentDate = new Date();

      // Show Date
      $scope.$watch("settings.additionalParams.showDate", function (showDate) {
        if (showDate !== undefined) {
          $scope.showDate = showDate;
        }
      });

      // Show Time
      $scope.$watch("settings.additionalParams.showTime", function (showTime) {
        if (showTime !== undefined) {
          $scope.showTime = showTime;
        }
      });

      // Show Title
      $scope.$watch("settings.additionalParams.showTitle", function (showTitle) {
        if (showTitle !== undefined) {
          $scope.showTitle = showTitle;
        }
      });

      // Show Location
      $scope.$watch("settings.additionalParams.showLocation", function (showLocation) {
        if (showLocation !== undefined) {
          $scope.showLocation = showLocation;
        }
      });

      // Show Description
      $scope.$watch("settings.additionalParams.showDescription", function (showDescription) {
        if (showDescription !== undefined) {
          $scope.showDescription = showDescription;
        }
      });

      // Date Format
      $scope.$watch("settings.additionalParams.dateFormat", function (format) {
        if (typeof format !== "undefined" && format) {
          $scope.dateFormatValue = format;
        }
      });

      // Date Range
      $scope.$watch("settings.additionalParams.dateRange", function (range) {
        if (range && range !== "day" && range !== "week") {
          if (!$scope.getAdditionalParam("dateFormat", null)) {
            // set a default selection
            $scope.setAdditionalParam("dateFormat", $scope.dateFormatValue);
          }

          $scope.showDateFormat = true;
        }
        else {
          $scope.showDateFormat = false;

          if ($scope.settings.additionalParams.hasOwnProperty("dateFormat")) {
            delete $scope.settings.additionalParams.dateFormat;
          }
        }
      });

    }])
  .value("defaultSettings", {
    "params": {},
    "additionalParams": {
      "calendar": "",
      "showCompleted": true,
      "scroll": {},
      "showDate": true,
      "dateRange": "day",
      "dateFont": {
        "bold": true
      },
      "showTime": true,
      "timeFormat": "12hour",
      "showEnd": "always",
      "timeFont": {
        "bold": true
      },
      "showTitle": true,
      "titleFont": {
        "bold": true
      },
      "showLocation": true,
      "locationFont": {
        "bold": true
      },
      "showDescription": true,
      "descriptionFont": {
        "size": "18"
      }
    }
  });
