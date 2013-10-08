/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-3
 * Time: обнГ3:13
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzZtree', [function(){
            return {
                restrict: 'E'
                , replace: true
                , template: '<ul class="ztree"></ul>'
                , scope: {setting: '='}
                , link: function(scope, element, attrs){
                    jQuery.fn.zTree.init(element, scope.setting);
                }
            };
        }]);
        return module;
    };

    return {
        initialize: initialize
    };
});