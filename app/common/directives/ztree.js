/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-3
 * Time: ÏÂÎç3:13
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzZtree', [function(){
            return {
                restrict: 'E'
                , replace: true
                , template: '<ul class="ztree"></ul>'
                , scope: {
                    setting: '='
                    , tid: '@'
                }
                , link: function(scope, element, attrs){
                    element.attr('id', scope.tid);

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