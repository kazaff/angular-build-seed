/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-11-5
 * Time: ионГ9:06
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', '$location', 'appShow', function($scope, Auth, $location, AppShow){
        Auth.isLogined();

        $scope.apps = [];
        AppShow.query(function(response){
            angular.forEach(response, function(app){
                app.name = decodeURI(app.name);
                app.domain += '/?&sign=' + app.sign;
            });

            $scope.apps = response;
        });
    }];
});