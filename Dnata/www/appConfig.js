var languagesSupported = ["en-US", "en"];
var defaultLanguage = "en-US";

requirejs.config({
    baseUrl: 'lib',
    paths: {
        util: "../util",
        js: "../js",
        constants:"../js/constants",
        actions:"../js/actions",
        stores: "../js/stores",
        views:"../js/components/views",
        controllers:"../js/components/controllers"
    }
});
requirejs(["jquery-2.2.1.min", "react", "flux", "l20n.min", "moment.min","react-with-addons"], function (jquery, react, flux, l20n, moment,reactaddons) {
    window.React = react;
    window.Reactaddons = reactaddons;
    window.Moment = moment;
    window.l20n = L20n.getContext ();
    window.getString = function (key) {
        var value = window.l20n.getSync (key);
        if(!value)
          value = key;
        return value;
    };
    window.l20n.registerLocales (defaultLanguage, languagesSupported);
    window.l20n.linkResource (function (locale) {
            var browserLanguage = defaultLanguage;//navigator.language;
            $ ("head").append ("<meta http-equiv='Content-Language' content = '" + browserLanguage + "'/>");
            return "locales/" + browserLanguage + ".l20n";
        });
    window.l20n.requestLocales();
    window.l20n.ready (function () {
      requirejs(["hammer.min"], function (hammer) {
          window.Hammer = hammer;
          requirejs(["js/index.js"]);
      });

    });
});
