/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-25
 * Time: 下午5:03
 * To change this template use File | Settings | File Templates.
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q', '$filter', 'api', 'application', function($scope, Auth, Action, $location, $routeParams, $q, $filter, Api, Application){
        Auth.isLogined();

        var page = 0;
        $scope.aid = $routeParams.aid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('appApiEdit', 'application').success(function(response){
            $scope.switchFlag = response.status;
        });

        //获取应用系统信息
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            $scope.app = response;
        });

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Api.query({page: ++page, aid: $routeParams.aid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.info = decodeURI(item.info);
                    item.requestName = decodeURI(item.requestName);
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

        //删除指定用户
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            Api.remove({pid: object.apiId, aid: $routeParams.aid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: 'API删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpList', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });

                }else{
                    //从列表中删除该条数据
                    $scope.data.splice(index, 1);

                    //删除陈功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: 'API删除成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };

        //获取第一屏数据
        $scope.downloadData();
    }];
});