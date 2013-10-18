define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', 'ip', '$filter', function($scope, Auth, Action, Application, $q, $routeParams, Ip, $filter){
        Auth.isLogined();

        //获取应用系统信息
        $scope.app = Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            return response;
        });

        $scope.ip = {validity: true, aid: $routeParams.aid};
        $scope.pristine = angular.copy($scope.ip);

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

            $scope.ip.begin = $filter('date')($scope.ip.begin, 'yyyy-MM-dd');
            $scope.ip.end = $filter('date')($scope.ip.end, 'yyyy-MM-dd');

            //去后端更新
            Ip.create($scope.ip).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统添加可访问IP成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.ip);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统添加可访问IP失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpAdd', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };
    }];
});