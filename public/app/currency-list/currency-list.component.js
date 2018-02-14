'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('currencyList')
    .component('currencyList', {
        templateUrl: 'app/currency-list/currency-list.template.html',
        controller: ['Currencies',
            function CurrencyListController(Currencies) {
                this.currencies = [];
                var currenciesObject = Currencies.GetCurrencies.query().$promise.then((data) => {
                    for(var currency of data) {
                        this.currencies.push({
                            name: currency['name'],
                            value: currency['value']
                        });
                    }
                });
            }
        ]
    });
