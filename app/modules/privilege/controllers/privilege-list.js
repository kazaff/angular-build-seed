/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-24
 * Time: 下午4:40
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'privilege', '$location', '$routeParams', function($scope, Auth, Action, Privilege, $location, $routeParams){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Privilege.query({page: ++page, privilege: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.privName = decodeURI(item.privName);
                    item.app = decodeURI(item.app);
                    item.group = decodeURI(item.group);
                    item.info = decodeURI(item.info);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //重置结果集，清空所有筛选条件，包括排序
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        //更改有效性
        $scope.changeValidity = function(index, status){

            var promise = Privilege.changStatus({pid: $scope.data[index].privId, status: status, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限的有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('privilegeList', 'privilege' , {page:1}));
                        }
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //更改默认状态
        $scope.changeDefault = function(index, status){

            var promise = Privilege.changStatus({pid: $scope.data[index].privId, status: status, type: 'default'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限的默认状态更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: true
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('privilegeList', 'privilege' , {page:1}));
                        }
                    });
                }else{
                    $scope.data[index].default = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //搜索相关的数据
        $scope.searchData = function(){
            page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;

            $location.hash($scope.searchText);
        };

        //获取第一屏数据
        $scope.downloadData();
    }];
});