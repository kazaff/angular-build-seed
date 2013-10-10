/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: 下午4:14
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$q', '$routeParams', 'ip', '$filter', function($scope, auth, Action, $q, $routeParams, Ip, $filter){

        //获取指定的可访问IP信息
        $scope.ip = {};
        Ip.get({aid: $routeParams.aid, pid: $routeParams.pid}).$promise.then(function(response){
            $scope.ip = response;
            $scope.ip.info = decodeURI(response.info);

            $scope.pristine = angular.copy($scope.ip);
        });

        $scope.reset = function(){
            $scope.ip = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.ip, $scope.pristine);
        };

        //修改有效性
        $scope.changeValidity = function(index, status){

            $scope.ip.validity = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //去后端更新
            var formData = {
                ipId: $scope.ip.ipId
                , appId: $scope.ip.appId
                , ip: $scope.ip.ip
                , validity: $scope.ip.validity
                , info: $scope.ip.info
                , begin: ($scope.ip.begin && $scope.ip.begin != -1) ? $filter('date')($scope.ip.begin, 'yyyy-MM-dd') : -1
                , end:  ($scope.ip.end && $scope.ip.end != -1) ? $filter('date')($scope.ip.end, 'yyyy-MM-dd') : -1
            };

            Ip.update(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统可访问IP编辑成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.ip);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统可访问IP编辑失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid, pid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpEdit', 'application' , {aid: aid, pid: pid}));
                            };
                        }($routeParams.aid, $routeParams.pid)
                    });
                }
            });
        };
    }];
});