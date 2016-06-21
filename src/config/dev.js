/* exported config */
var config = {
  apiKey: "AIzaSyBXxVK_IOV7LNQMuVVo_l7ZvN53ejN86zY"
};

if (typeof angular !== "undefined") {
  angular.module("risevision.widget.googleCalendar.config", [])
    .value("defaultLayout", "widget.html");

  angular.module("risevision.common.i18n.config", [])
    .constant("LOCALES_PREFIX",
      "components/rv-common-i18n/dist/locales/translation_")
    .constant("LOCALES_SUFIX", ".json");
}
