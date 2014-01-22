/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-13
 * Time: 2:54
 */
define(function(){
    'use strict';

    var initialize = function(module){

        module.directive('kzBreadcrumbs', ['$location', function($location){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<div id="breadcrumb">' +
                                '<a><i class="icon-sitemap"></i> {{ data[0].name }}</a>' +
                                '<a class="tip-bottom" data-ng-repeat="item in data" data-ng-show="!$first" data-ng-href="#!{{item.uri}}" data-ng-click="cleanBread($index)">{{ item.name }}</a>' +
                                '<a class="current" data-ng-if="anchor">{{ anchor }} <i class="icon-remove-sign" data-ng-click="removeHash()"></i></a>' +
                            '</div>'
                , link: function(scope, element, attrs){
                    scope.removeHash = function(){
                        $location.hash('');
                    };

                    scope.cleanBread = function(index){
                        scope.data.splice(index + 1);
                        window.localStorage.breadCrumbs = JSON.stringify(scope.data);
                    }

                    scope.$watch(function(){
                        return $location.hash();
                    }, function(hash){
                        scope.anchor = hash;
                    });

                    scope.$on("$routeChangeSuccess", function(){
                        scope.data = JSON.parse(window.localStorage.breadCrumbs);
                    });
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});