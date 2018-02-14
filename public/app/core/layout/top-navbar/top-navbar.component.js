'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('core.layout').
    component('topNavbar', {
        templateUrl: 'app/core/layout/top-navbar/top-navbar.template.html',
        controller: ['$location',
            function TopNavbarController($location) {
                this.isActive = function(viewLocation) {
                    return viewLocation === $location.path();
                }
            }
        ]
    });
