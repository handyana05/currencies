'use strict';

angular.module('core.services')
    .factory('Currencies', ['$resource',
        function($resource) {
            var getCurrencies = $resource('/api/currencies', null, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data) {
                        return angular.fromJson(data);
                    }
                }
            });

            var getCurrency = $resource('/api/currency/:currency', null, {
                query: {
                    method: 'GET',
                    isArray: false,
                    transformResponse: function(data) {
                        return angular.fromJson(data);
                    }
                }
            });

            return {
                GetCurrencies: getCurrencies,
                GetCurrency: getCurrency
            };
        }
    ]);
