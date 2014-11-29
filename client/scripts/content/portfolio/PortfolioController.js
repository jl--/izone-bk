;
'use strict';
angular.module('app')
    .controller('PortfolioController', ['$scope', '$window', 'Portfolio', 'portfolio', 'APP_CONFIG',
        function($scope, $window, Portfolio, portfolio, APP_CONFIG) {
            var scope = this;
            scope.status = {};
            scope.portfolio = {
                designs: [],
                projects: []
            };

            scope.viewItem = function(item){
                if($window.innerWidth < 560){
                    return ;
                }
                scope.item = item;
                scope.status.viewingItem = !scope.status.viewingItem;
            };

            portfolio.$promise.then(function(){
                scope.portfolio.designs  = portfolio.filter(function(item){
                    return item.type === 'design';
                });
                scope.portfolio.projects  = portfolio.filter(function(item){
                    return item.type === 'project';
                });
                console.log(scope);
            });

        }
    ]);