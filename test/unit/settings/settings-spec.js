"use strict";

describe("Google Calendar Settings", function() {
  beforeEach(module("risevision.widget.googleCalendar.settings"));

  var defaultSettings, $scope;

  beforeEach(function(){
    inject(function($injector,$rootScope, $controller){
      defaultSettings = $injector.get("defaultSettings");
      $scope = $rootScope.$new();
      $controller("calendarSettingsController", {$scope: $scope});
    });
  });

  it("should define defaultSettings",function(){
    expect(defaultSettings).to.be.truely;
    expect(defaultSettings).to.be.an("object");
  });

  it("should define calendarSettingsController",function(){
    expect($scope.showDateFormat).to.be.truely;
    expect($scope.showDateFormat).to.be.false;
    expect($scope.dateFormatValue).to.be.truely;
    expect($scope.dateFormatValue).to.be.a("string");
    expect($scope.currentDate).to.be.truely;
    expect($scope.currentDate).to.be.an.instanceof(Date);
  });
});
