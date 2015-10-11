import 'angular/angular';
import 'angular-route/angular-route.js';

import _ from 'lodash';
import { HomeController } from "./home/ctrl.js";

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

angular.module("tyton")
  .controller("HomeController", [ HomeController ]);
