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
                                        '<a data-ng-click="toggle(item)"><i class="{{ item.icon }}  icon-white"></i> <span>{{ item.title }}</span> <span class="label label-important">{{ item.son.length }}</span></a>' +
                                        '<ul data-slide-switch="item.switch">' +
                                            '<li data-ng-repeat="operation in item.son">' +
                                                '<a href="#!{{ createLink(operation.uri) }}">{{ operation.title }}</a>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</li>' +
                                '</ul>'
                    , scope: {
                        data: '='
                    }
                    , controller: ['$location', 'action', function($location, action){
                        //判断当前菜单组是否被选中：包含当前url显示的页面
                        this.checkActive = function(group){
                            var currentUri = $location.path()
                                , flag = false;

                            angular.forEach(action.data, function(item){
                                if(item.group == group){

                                    angular.forEach(item.son, function(route){

                                        if(!angular.isUndefined(route.uri)){
                                            var reg = new RegExp(route.uri.replace(/:(.*)[\/]?/g, '(.*)'), 'ig');
                                            if(reg.test(currentUri)){
                                                flag = true;
                                                return false;
                                            }
                                        }

                                    });

                                    return false;
                                }
                            });

                            return flag;
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

                        scope.toggle = function(item){
                            item.switch = !item.switch;
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