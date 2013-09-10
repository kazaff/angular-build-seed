/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: 上午9:59
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('action', ['action', function(action){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<a></a>'
                , link: function(scope, element, attrs){
                    action.link(attrs.name, attrs.group).success(function(data){
                        element.html('<i class="'+ data.icon + ' ' + (attrs.color ? attrs.color : '') + '"></i> ' + data.title);
                        element.attr('href', '#!' + data.uri);

                        //TODO 需要判断当前用户是否有权限进行该操作
                        //element.remove(); //若无权限，则不显示该链接
                        //element.attr('class', element.attr('class') + ' disabled');   //若无权限，则禁用该链接
                    });
                }
            }
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});