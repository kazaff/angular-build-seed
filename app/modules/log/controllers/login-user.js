/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: 下午3:52
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', 'auth', 'action', 'log', function($scope, $routeParams, auth, action, Log){
        var page = $routeParams.page;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;

        $scope.data = [];
        Log.loginList({page: page, uid: $routeParams.uid}).$promise.then(function(response){

            angular.forEach(response.items, function(item){
                $scope.data.push(item);
            });

            if(!response.hasMore){
                $scope.hasManyData = false;
            }

            $scope.isLoading = false;
        });

        //根据status筛选结果集
        $scope.statusFilter = function(value){
            $scope.status = {status: value};

            $scope.resetFlag = 1;
        };

        //重置结果集，清空所有筛选条件，包括排序
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Log.loginList({page: ++page, uid: $routeParams.uid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };
    }];
});