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
requirejs(["jquery-2.1.4.min", "react", "flux", "l20n.min"], function (jquery, react, flux, l20n) {
    window.React = react;
    window.l20n = L20n.getContext ();
    window.getString = function (key) {
        var value = window.l20n.getSync (key);
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
