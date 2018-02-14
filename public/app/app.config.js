'use strict';

angular.module('currencyApp').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/currencies', {
                template: '<currency-list></currency-list>'
            })
            .when('/currency/:id', {
                template: '<currency></currency>'
            })
            .when('/calculator', {
                template: '<currency-calculator></currency-calculator>'
            })
            .otherwise({redirectTo: '/currencies'});
    }
]);
