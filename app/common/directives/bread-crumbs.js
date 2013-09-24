/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-13
 * Time: ÏÂÎç2:54
 */
define(function(){
    'use strict';

    var initialize = function(module){

        module.directive('kzBreadcrumbs', ['action', '$location', function(action, $location){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<div id="breadcrumb">' +
                                '<a class="tip-bottom"><i class="{{ info.icon }}"></i> {{ info.title }}</a>' +
                                '<a>{{ info.route.title }}</a>' +
                                '<a class="current" data-ng-if="anchor">{{ anchor }} <i class="icon-remove-sign" data-ng-click="removeHash()"></i></a>' +
                            '</div>'
                , link: function(scope, element, attrs){
                    scope.removeHash = function(){
                        $location.hash('');
                    };

                    scope.$watch(function(){
                        return $location.hash();
                    }, function(hash){
                        scope.anchor = hash;
                    });

                    scope.$watch(function(){
                        return $location.path();
                    }, function(uri){
                        scope.info = action.findRoute(uri);
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