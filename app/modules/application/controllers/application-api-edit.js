/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: 上午8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', 'api', '$filter', function($scope, Auth, Action, Application, $q, $routeParams, Api, $filter){
        Auth.isLogined();

        //获取应用系统信息
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            $scope.app = response;
        });

        //获取选择方式列表
        $scope.select = {};
        Api.getSelectList({page:0}).$promise.then(function(response){
            $scope.select = response;
            $scope.api.selected=  $scope.select[0];
        });

        $scope.api = { aid: $routeParams.aid};
        $scope.pristine = angular.copy($scope.api);

        $scope.reset = function(){
            $scope.api = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.api, $scope.pristine);
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //去后端更新
            Api.create($scope.api).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统添加API成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.ip);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统添加API失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiAdd', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };
    }];
});