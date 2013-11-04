/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-25
 * Time: 下午5:03
 * To change this template use File | Settings | File Templates.
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q', '$filter', 'api','apiParameter', 'application', function($scope, Auth, Action, $location, $routeParams, $q, $filter, Api,ApiParameter, Application){
        Auth.isLogined();

        var page = 0;
        $scope.aid = $routeParams.aid;
        $scope.apiId = $routeParams.apiid;
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
            $scope.app = response;
        });

        //获取应用系统API信息
        $scope.api = {};
        Api.getApiInfo({aid: $routeParams.aid,apiid: $routeParams.apiid}).$promise.then(function(response){
            response.info = decodeURI(response.info);
            response.requestName = decodeURI(response.requestName);
            $scope.api = response;
        });

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            ApiParameter.query({page:++page,aid: $routeParams.aid,apiid: $routeParams.apiid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.parameterCN = decodeURI(item.parameterCN);
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

        //删除指定参数
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            ApiParameter.remove({pid: object.parameterId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: 'API参数删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiParameter', 'application' , {aid: aid}));
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