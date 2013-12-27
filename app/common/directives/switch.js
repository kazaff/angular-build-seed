/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-26
 * Time: 下午5:45
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzSwitch', [function(){
            return {
                restrict: 'E'
                , replace: true
                , template: '<div class="make-switch switch-mini">' +
                                '<input type="checkbox" />' +
                            '</div>'
                , scope: {
                    id: '='
                    , method: '&'
                    , model: '='
                    , active: '='
                }
                , link: function(scope, element, attrs){

                    element.bootstrapSwitch();
                    element.bootstrapSwitch('setState', scope.model);
                    element.bootstrapSwitch('setActive', scope.active);

                    element.on('switch-change', function(e, data){
                        scope.method({item: scope.id, status: data.value}).then(function(response){
                            element.bootstrapSwitch('setState', !data.value, true);
                        });    //调用业务回调
                        scope.$root.$$phase || scope.$apply();  //避免$digest already in progress
                    });

                    scope.$watch('model', function(value){
                        element.bootstrapSwitch('setState', value, true);   //第三个参数用于禁止触发'switch-change'事件，避免死循环
                    });

                    scope.$watch('active', function(value){
                        element.bootstrapSwitch('setActive', value);
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