/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-11
 * Time: 上午10:24
 */
define(function(){
    'use strict';

    var initialize = function(module){

        module
            .directive('kzSidebarMenu', [function(){
                return {
                    restrict: 'EA'
                    , replace: true
                    , template: '<ul>' +
                                    '<li data-ng-repeat="item in data" data-ng-class="{active: checkActive(item.group)}" class="submenu">' +
                                        '<a data-ng-click="toggle(item)"><i class="{{ item.icon }}  icon-white"></i> <span>{{ item.title }}</span></a>' +
                                        '<ul data-slide-switch="item.show">' +
                                            '<li data-ng-repeat="operation in item.son" data-ng-show="operation.status">' +
                                                '<a data-ng-href="#!{{ createLink(operation.uri) }}">{{ operation.title }}</a>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</li>' +
                                '</ul>'
                    , scope: {
                        data: '='
                    }
                    , controller: [function(){
                        //判断当前菜单组是否被选中：包含当前url显示的页面
                        //该方法会在菜单出现交互后频繁调用，貌似ngClass会导致动态监听
                        this.checkActive = function(group){
                            var breadCrumbs = null;
                            if(!angular.isUndefined(window.localStorage.breadCrumbs)){
                                breadCrumbs = JSON.parse(window.localStorage.breadCrumbs);
                            }
                            var currentLoaction =  angular.isUndefined(breadCrumbs[0])? null : breadCrumbs[0];
                            return (group === currentLoaction.group)? true: false;
                        };

                        //初始化链接中的动态参数
                        this.createLink = function(argObj){
                            return function(uri){
                                angular.forEach(argObj, function(value, key){
                                    uri = uri.replace(':'+key, value);
                                });
                                return uri;
                            };
                        }
                    }]
                    , link: function(scope, element, attrs, controller){
                        scope.checkActive = controller.checkActive;
                        scope.createLink = controller.createLink((new Function('return ' + attrs.args))());

                        scope.toggle = function(target){
                            angular.forEach(scope.data, function(item){
                                if(target !== item){
                                    item.show = false;
                                }
                            });

                            target.show = !target.show;
                        };
                    }
                };
            }])
            .directive('slideSwitch', ['$animate', function($animate){
                return function(scope, element, attrs){
                    scope.$watch(attrs.slideSwitch, function(value){
                        if(value){
                            $animate.addClass(element, 'slideSwitchAnimate');
                        }else{
                            $animate.removeClass(element, 'slideSwitchAnimate');
                        }
                    });
                }
            }])
            .animation('.slideSwitchAnimate', function(){
                return {
                    addClass: function(element, className){
                        element.slideDown();
                    },
                    removeClass: function(element, className){
                        element.slideUp();
                    }
                }
            });

        return module;
    };

    return {
        initialize: initialize
    };
});