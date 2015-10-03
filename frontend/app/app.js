require("angular/angular");
require("angular-route/angular-route.js");

_ = require("lodash");

angular.module("tyton", [
  "ngRoute"
  ])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/static/home/home.html"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);

require("./home/ctrl.js");
