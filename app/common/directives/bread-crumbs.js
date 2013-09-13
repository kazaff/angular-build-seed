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
                                '<a class="tip-bottom"><i class="{{ info.group.icon }}"></i> {{ info.title }}</a>' +
                                '<a class="current">{{ info.route.title }}</a> ' +
                            '</div>'
                , link: function(scope, element, attrs){
                    var uri = $location.path();
                    scope.info = action.findRoute(uri);
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});