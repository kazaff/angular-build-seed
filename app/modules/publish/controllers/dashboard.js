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
    }];
});