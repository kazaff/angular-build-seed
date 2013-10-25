/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: обнГ2:45
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'auth', '$http', function($scope, Auth, $http){
        Auth.isLogined();
    }];
});