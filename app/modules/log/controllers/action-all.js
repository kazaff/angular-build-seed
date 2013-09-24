/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: 上午10:00
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams','auth', 'action', 'log', '$location', function($scope, $routeParams, auth, action, Log, $location){
        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;

        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Log.actionList({page: ++page, uid: 0, action: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.userName = decodeURI(item.userName);
                    item.action = decodeURI(item.action);
                    item.info = decodeURI(item.info);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        $scope.downloadData();

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

        //搜索相关的数据
        $scope.searchData = function(){
            page = $routeParams.page - 1;
            $scope.data = [];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData = true;

            $location.hash($scope.searchText);

            $scope.downloadData();
        };
    }];
});