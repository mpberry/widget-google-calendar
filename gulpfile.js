/* jshint node: true */

(function () {
  "use strict";


  var bump = require("gulp-bump");
  var concat = require("gulp-concat");
  var del = require("del");
  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var jshint = require("gulp-jshint");
  var minifyCSS = require("gulp-minify-css");
  var path = require("path");
  var rename = require("gulp-rename");
  var runSequence = require("run-sequence");
  var factory = require("widget-tester").gulpTaskFactory;
  var sourcemaps = require("gulp-sourcemaps");
  var uglify = require("gulp-uglify");
  var usemin = require("gulp-usemin");

  var appJSFiles = [
      "src/**/*.js",
      "!./src/components/**/*"
    ],
    htmlFiles = [
      "./src/settings.html",
      "./src/widget.html"
    ];

  gulp.task("clean", function (cb) {
    del(["./dist/**"], cb);
  });

  gulp.task("config", function() {
    var env = process.env.NODE_ENV || "dev";
    gutil.log("Environment is", env);

    return gulp.src(["./src/config/" + env + ".js"])
      .pipe(rename("config.js"))
      .pipe(gulp.dest("./src/config"));
  });

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("lint", function() {
    return gulp.src(appJSFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
  });

  gulp.task("source", ["lint"], function () {
    return gulp.src(htmlFiles)
      .pipe(usemin({
        css: [sourcemaps.init(), minifyCSS(), sourcemaps.write()],
        js: [sourcemaps.init(), uglify(), sourcemaps.write()]
      }))
      .pipe(gulp.dest("dist/"));
  });

  gulp.task("unminify", function () {
    return gulp.src(htmlFiles)
      .pipe(usemin({
        css: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")],
        js: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")]
      }))
  });

  gulp.task("fonts", function() {
    return gulp.src("src/components/common-style/dist/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"));
  });

  gulp.task("images", function() {
    return gulp.src("src/components/rv-bootstrap-formhelpers/img/bootstrap-formhelpers-googlefonts.png")
      .pipe(gulp.dest("dist/img"));
  });

  gulp.task("i18n", function(cb) {
    return gulp.src(["src/components/rv-common-i18n/dist/locales/**/*"])
      .pipe(gulp.dest("dist/locales"));
  });

  gulp.task("watch",function(){
    gulp.watch("./src/**/*", ["build"]);
  });

  gulp.task("webdriver_update", factory.webdriveUpdate());

  // e2e testing
  // Settings
  gulp.task("html:e2e:settings", factory.htmlE2E({
    files: htmlFiles,
    e2eClient: "../test/calendar-api-mock.js",
    e2eMockData: "../test/data/main.js"
  }));

  gulp.task("e2e:server:settings", ["config", "html:e2e:settings"], factory.testServer());

  gulp.task("test:e2e:settings:run", ["webdriver_update"], factory.testE2EAngular({
    testFiles: "test/e2e/settings.js"}
  ));

  gulp.task("test:e2e:settings", function(cb) {
    runSequence(["html:e2e:settings", "e2e:server:settings"], "test:e2e:settings:run", "e2e:server-close", cb);
  });

  // Widget
  gulp.task("html:e2e:widget", factory.htmlE2E({
    files: htmlFiles,
    e2eMockData: "../test/data/main.js"
  }));

  gulp.task("e2e:server:widget", ["config", "html:e2e:widget"], factory.testServer());

  gulp.task("test:e2e:widget:run", factory.testE2E({
    testFiles: "test/e2e/widget-*.js"
  }));

  gulp.task("test:e2e:widget", function(cb) {
    runSequence(["html:e2e:widget", "e2e:server:widget"], "test:e2e:widget:run", "e2e:server-close", cb);
  });

  gulp.task("e2e:server-close", factory.testServerClose());

  gulp.task("test:e2e", function(cb) {
    runSequence("test:e2e:settings", "test:e2e:widget", cb);
  });

  // Unit testing
  gulp.task("test:unit:settings", factory.testUnitAngular({
    testFiles: [
      "src/components/jquery/dist/jquery.js",
      "src/components/q/q.js",
      "src/components/angular/angular.js",
      "src/components/angular-translate/angular-translate.js",
      "src/components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "src/components/angular-route/angular-route.js",
      "src/components/angular-mocks/angular-mocks.js",
      "node_modules/widget-tester/mocks/common-mock.js",
      "src/components/bootstrap-sass-official/assets/javascripts/bootstrap.js",
      "src/components/angular-bootstrap/ui-bootstrap-tpls.js",
      "src/components/component-storage-selector/dist/storage-selector.js",
      "src/components/widget-settings-ui-components/dist/js/**/*.js",
      "src/components/widget-settings-ui-core/dist/*.js",
      "src/components/bootstrap-form-components/dist/js/**/*.js",
      "src/config/test.js",
      "src/settings/settings-app.js",
      "src/settings/**/*.js",
      "test/unit/settings/**/*spec.js"]
    }
  ));

  gulp.task("test:unit:widget", factory.testUnitAngular({
    testFiles: [
      "src/components/jquery/dist/jquery.js",
      "test/data/main.js",
      "src/components/auto-scroll/jquery.auto-scroll.js",
      "src/components/moment/moment.js",
      "src/components/moment-range/lib/moment-range.js",
      "src/components/underscore/underscore.js",
      "node_modules/widget-tester/mocks/gadget-mocks.js",
      "src/config/test.js",
      "src/components/widget-common/dist/common.js",
      "src/widget/calendar.js",
      "src/widget/main.js",
      "src/widget/day.js",
      "src/widget/event.js",
      "src/widget/provider.js",
      "test/calendar-api-mock.js",
      "test/unit/widget/**/*spec.js"
    ]
  }));

  gulp.task("test:unit", function(cb) {
    runSequence("test:unit:settings", "test:unit:widget", cb);
  });

  gulp.task("test:metrics", factory.metrics());

  gulp.task("test", function(cb) {
    runSequence("test:e2e", "test:unit", "test:metrics", cb);
  });

  gulp.task("build", function (cb) {
    runSequence(["clean", "config"], ["source", "fonts", "images", "i18n"], ["unminify"], cb);
  });

  gulp.task("default", function(cb) {
    runSequence("test", "build", cb);
  });
})();
