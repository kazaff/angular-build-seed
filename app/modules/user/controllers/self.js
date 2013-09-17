/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-13
 * Time: 上午11:25
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', function($scope, auth, action, User){

        $scope.user = auth.userInfo();
        $scope.pristine = angular.copy($scope.user);

        $scope.reset = function(){
            $scope.user = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.user, $scope.pristine);
        };

        $scope.save = function(){
            //去后端更新
            User.updateSelf({user:encodeURIComponent(JSON.stringify($scope.user))}).$promise.then(function(response){

                if(response['status'] == 1){
                    //更新本地存储
                    auth.userInfo($scope.user);
                    $scope.pristine = angular.copy($scope.user);
                }
            });
        };
    }];
});