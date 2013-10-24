/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 下午2:45
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'auth', '$http', function($scope, Auth, $http){
        Auth.isLogined();

        $scope.upload= function(data){

            $http({
                method:'POST'
                , url: config.domain + 'userFace/'
                , data: data
                , headers: {'Content-Type': undefined}  //在ng1.20版本中，一定要设置为undefined（而非'multipart/form-data'），否则后端无法使用$_FILES接收
                ,transformRequest: function(data) { return data;}
            })
                .success(function(data, status, headers, config){
                    console.log(data);
                })
                .error(function(data, status, headers, config){
                    console.log(data);
                });
        }
    }];
});