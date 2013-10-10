/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: 上午8:23
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', function($scope, auth, Action, Application, $q, $routeParams){

        //获取指定用户的信息
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){

            $scope.app = response;
            $scope.app.name = decodeURI(response.name);
            $scope.app.info = decodeURI(response.info);

            $scope.pristine = angular.copy($scope.app);
        });

        $scope.reset = function(){
            $scope.app = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.app, $scope.pristine);
        };

        //修改有效性
        $scope.changeValidity = function(index, status){

            $scope.app.validity = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //修改IP限制
        $scope.changeIpLimit = function(index, status){

            $scope.app.ipLimit = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //去后端更新
            //去后端更新
            var formData = {
                appId: $scope.app.appId
                , tag: $scope.app.tag
                , name: encodeURIComponent($scope.app.name)
                , domain: $scope.app.domain
                , validity: $scope.app.validity
                , ipLimit: $scope.app.ipLimit
                , info: encodeURIComponent($scope.app.info)
            };

            Application.update(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统保存成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.app);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统保存失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appEdit', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };
    }];
});