/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: 上午9:41
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q', '$filter', 'ip', 'application', function($scope, Auth, Action, $location, $routeParams, $q, $filter, Ip, Application){
        Auth.isLogined();

        var page = 0;
        $scope.aid = $routeParams.aid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('appIpEdit', 'application').success(function(response){
            $scope.switchFlag = response.status;
        });

        //获取应用系统信息
        $scope.app = Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            return response;
        });

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Ip.query({page: ++page, aid: $routeParams.aid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.info = decodeURI(item.info);
                    if(item.begin == -1){
                        item.begin = '不限制';
                    }else{
                        item.begin = Date.parse(item.begin);
                    }
                    if(item.end == -1){
                        item.end = '不限制';
                    }else{
                        item.end = Date.parse(item.end);
                    }

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

            var promise = Ip.changStatus({id: $scope.data[index].ipId, status: status, aid: $routeParams.aid, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: 'IP的有效性更改失败!'
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
                    $scope.data[index].validity = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //删除指定用户
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            Ip.remove({pid: object.ipId, aid: $routeParams.aid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: 'IP删除失败!'
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
                        , text: 'IP删除成功!'
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