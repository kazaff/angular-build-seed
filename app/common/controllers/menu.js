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
        module.controller('menuCtrl', ['$scope', 'action', function($scope, Action){
            $scope.menu = [];
            Action.menu().success(function(data){

                //把组下包含的uri抽出来，用于方便sidebar-menu指令验证当前组
                angular.forEach(data, function(item, key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                            data[key].sonUris.push(route.uri);
                    });
                });

                $scope.menu = data;
                console.log(data);
            });
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});