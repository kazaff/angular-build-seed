/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-24
 * Time: 上午8:43
 */
define([

], function(){
    'use strict';

    var initialize = function(module){

        module.directive('kzTableFixedHeader', [function(){
            return {
                restrict: 'A'
                , link: function(scope, element, attrs){

                    element.addClass('table-fixed-header');
                    element.find('thead').addClass('header')

                    element.fixedHeader();
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});