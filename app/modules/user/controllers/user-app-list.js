/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: 上午10:14
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', 'userApp', function($scope, Auth, Action, $location, $routeParams, UserApp){
        var page = $routeParams.page - 1;
        $scope.uid = $routeParams.uid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('userAppDelete', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserApp.query({page: ++page, uid: $routeParams.uid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.app = decodeURI(item.app);
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

        //更改开关状态
        $scope.changeStatus = function(index, status){

            var promise = UserApp.changStatus({uid: $routeParams.uid, aid: $scope.data[index].appId, status: status, type: 'status'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户可访问系统的开启状态更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppList', 'user' , {uid: uid, page:1, aid:0}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].status = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //更改IP限制状态
        $scope.changeIpLimit = function(index, status){

            var promise = UserApp.changStatus({uid: $routeParams.uid, aid: $scope.data[index].appId, status: status, type: 'ipLimit'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户可访问系统的IP限制状态更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppList', 'user' , {uid: uid, page:1, aid:0}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].ipLimit = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //删除指定系统
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            UserApp.remove({uid: $routeParams.uid, aid: object.appId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户可访问系统删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppList', 'user' , {uid: uid, page:1, aid:0}));
                            };
                        }($routeParams.uid)
                    });

                }else{
                    //从列表中删除该条数据
                    $scope.data.splice(index, 1);

                    //删除陈功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户可访问系统删除成功!'
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