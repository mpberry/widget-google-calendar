/* exported config */
var config = {
  apiKey: "AIzaSyBXxVK_IOV7LNQMuVVo_l7ZvN53ejN86zY"
};

if (typeof angular !== "undefined") {
  angular.module("risevision.widget.googleCalendar.config", [])
    .value("defaultLayout", "http://s3.amazonaws.com/widget-google-calendar/0.1.0/dist/widget.html");

  angular.module("risevision.common.i18n.config", [])
    .constant("LOCALES_PREFIX", "locales/translation_")
    .constant("LOCALES_SUFIX", ".json");
}
