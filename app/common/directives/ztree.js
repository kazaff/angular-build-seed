/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-3
 * Time: 下午3:13
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
                    //若没有指定dom的id，则把当前dom的id指定为scope的编号
                    if(angular.isUndefined(scope.tid)){
                        element.attr('id', scope.$id);
                    }else{
                        element.attr('id', scope.tid);
                    }


                    var zTree = null;

                    if(attrs.type == "dynamic"){
                        scope.$watch('setting', function(newValue){
                            if(!angular.isUndefined(newValue)){
                                init();
                            }
                        });
                    }else{
                        init();
                    }

                    //初始化树
                    function init(){
                        var data = null;
                        if(!angular.isUndefined(scope.setting) && !angular.isUndefined(scope.setting.staticData)){
                            data = scope.setting.staticData;
                        }
                        zTree = jQuery.fn.zTree.init(element, scope.setting, data);

                        if(attrs.expandall === 'true'){
                            zTree.expandAll(true);
                        }
                    }
                }
            };
        }]);
        return module;
    };

    return {
        initialize: initialize
    };
});