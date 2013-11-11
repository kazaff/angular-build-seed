/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-9
 * Time: 下午2:46
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', 'application', function($scope, Auth, Action, $location, $routeParams, Application){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('appEdit', 'application').success(function(response){
            $scope.switchFlag = response.status;
        });

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Application.query({page: ++page}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.app = decodeURI(item.app);
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

        //更改IP限制状态
        $scope.changeIpLimit = function(item, status){

            var promise = Application.changStatus({aid: item.appId, status: status, type: 'ipLimit'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统的IP限制状态更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });
                }else{
                    item.ipLimit = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //更改有效性
        $scope.changeValidity = function(item, status){

            var promise = Application.changStatus({aid: item.appId, status: status, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统的有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });
                }else{
                    item.validity = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //更改有效性
        $scope.changeAuth = function(item, status){

            var promise = Application.changStatus({aid: item.appId, status: status, type: 'auth'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统的授权状态更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });
                }else{
                    item.authorization = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //删除指定系统
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            Application.remove({aid: object.appId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: !angular.isUndefined(response.msg) ? decodeURI(response.msg) : '应用系统删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });

                }else{
                    //从列表中删除该条数据
                    $scope.data.splice(index, 1);

                    //删除陈功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统删除成功!'
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