'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('currency')
    .component('currency', {
        templateUrl: 'app/currency/currency.template.html',
        controller: ['$routeParams', 'Currencies',
            function CurrencyListController($routeParams, Currencies) {
                this.currency = $routeParams.id;
                var currencyobj = Currencies.GetCurrency.query({ currency: $routeParams.id }).$promise.then((data) => {
                    this.currencyValue = data['value'];
                });
            }
        ]
    });
