/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-25
 * Time: 下午5:07
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('ngBlur', ['$parse', function($parse) {
            return function(scope, element, attr) {
                var fn = $parse(attr['ngBlur']);
                element.bind('blur', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            }
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});