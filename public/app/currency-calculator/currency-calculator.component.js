'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('currencyCalculator')
    .component('currencyCalculator', {
        templateUrl: 'app/currency-calculator/currency-calculator.template.html',
        controller: ['$scope', 'Currencies',
            function CurrencyCalculatorController($scope, Currencies) {
                this.currencies = [];
                this.selectedAmountFrom = '1';
                this.selectedAmountTo = '';

                var self = this;

                var currenciesObject = Currencies.GetCurrencies.query().$promise.then((data) => {
                    for(var currency of data) {
                        self.currencies.push({
                            name: currency['name'],
                            value: currency['value']
                        });
                    }

                    self.currencies.push({
                        name: 'EUR',
                        value: ''
                    });

                    self.selectedCurrencyFrom = self.currencies[self.currencies.length - 1];
                    self.selectedCurrencyTo = self.currencies[0];

                    self.calculateCurrency();
                });

                this.calculateCurrency = function() {
                    this.calculateFromTo();
                    /*
                    if (this.selectedAmountFrom !== '' && this.selectedAmountTo === '') {
                        this.calculateFromTo();
                    }
                    else if (this.selectedAmountTo !== '' && this.selectedAmountFrom === '') {
                        this.calculateToFrom();
                    }
                    */
                }

                this.optionsFromOnChange = function() {
                    resetSelectedAmountTo();
                };

                this.optionsToOnChange = function() {
                    resetSelectedAmountFrom();
                };

                this.inputAmountFromFocus = function() {
                    this.lastFocus = 'from'
                };

                this.inputAmountToFocus = function() {
                    this.lastFocus = 'to'
                };

                $scope.$watch('$ctrl.selectedAmountFrom', (newValue, oldValue) => {
                    if(newValue !== oldValue) {
                        resetSelectedAmountTo();
                    }
                });

                $scope.$watch('$ctrl.selectedAmountTo', (newValue, oldValue) => {
                    if(newValue !== oldValue){
                        this.lastChange = 'to';
                    }
                });

                function resetSelectedAmountTo() {
                    self.selectedAmountTo = '';
                }

                function resetSelectedAmountFrom() {
                    self.selectedAmountFrom = '';
                }

                this.calculateFromTo = function () {
                    var eurBase, baseVal, targetVal;
                    if(this.selectedCurrencyFrom.name === 'EUR') {
                        eurBase = 1;
                    }
                    else {
                        eurBase = parseFloat(this.selectedCurrencyFrom.value);
                    }

                    baseVal = parseFloat(this.selectedAmountFrom) / eurBase;

                    if(this.selectedCurrencyTo.name === 'EUR') {
                        targetVal = 1;
                    }
                    else {
                        targetVal = self.selectedCurrencyTo.value;
                    }

                    this.selectedAmountTo = ((targetVal * baseVal).toFixed(2)).toString();
                };

                this.calculateToFrom = function () {
                    var eurBase, baseVal, targetVal;
                    if(this.selectedCurrencyTo.name === 'EUR') {
                        eurBase = 1;
                    }
                    else {
                        eurBase = parseFloat(this.selectedCurrencyTo.value);
                    }

                    baseVal = parseFloat(this.selectedAmountTo) / eurBase;

                    if(this.selectedCurrencyFrom.name === 'EUR') {
                        targetVal = 1;
                    }
                    else {
                        targetVal = this.selectedCurrencyFrom.value;
                    }

                    this.selectedAmountFrom = ((targetVal * baseVal).toFixed(2)).toString();
                };
            }
        ]
    });
