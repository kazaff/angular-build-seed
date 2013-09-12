/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: ÉÏÎç10:28
 */
define(function(){
    'use strict';

    var initialize = function(module){

        //Ö÷²Ëµ¥
        module.controller('menuCtrl', ['$scope', 'action', function($scope, action){
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
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});