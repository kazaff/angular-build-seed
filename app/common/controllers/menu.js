/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: 上午10:28
 */
define(function(){
    'use strict';

    var initialize = function(module){

        //主菜单
        module.controller('menuCtrl', ['$scope', 'action', '$location', function($scope, action, $location){
            $scope.menu = [];
            action.menu().success(function(data){

                angular.forEach(data, function(item, key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                        data[key].sonUris.push(route.uri);
                    });
                });

                $scope.menu = data;
            });

            //判断当前菜单组是否被选中：包含当前url显示的页面
            $scope.checkActive = function(uris){
                var currentUri = $location.path()
                    , flag = false;

                angular.forEach(uris, function(item){
                    var reg = new RegExp(item.replace(/:(.*)[\/]?/g, '(.*)'), 'ig');
                    if(reg.test(currentUri)){
                        flag = true;
                        return false;
                    }

                });

                return flag;
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});