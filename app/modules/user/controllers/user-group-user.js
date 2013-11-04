/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: 下午3:52
 */
define(function(){
    'use strict';  

    return ['$scope', '$routeParams', 'auth', 'action', 'userGroup', 'usergroupuser', function($scope, $routeParams, Auth, Action, UserGroup, usergroupuser){
		Auth.isLogined();
		
        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            usergroupuser.groupUserList({page: ++page,gid:$routeParams.gid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.userName = decodeURI(item.userName);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //获取用户信息
        $scope.group={};
        UserGroup.get({gid: $routeParams.gid, uid: 0}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            response.parentName = decodeURI(response.parentName);
            response.bindGroup = decodeURI(response.bindGroup);
            $scope.group= response;
        });

        //删除一条记录
        $scope.userDelete = function(id, userName, index){
            usergroupuser.delete({uid: id, gid:$routeParams.gid}).$promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroupUserList', 'user' , {gid: gid, page:1}));
                            };
                        }($routeParams.gid)
                    });
                }
                else{
                    $scope.data.splice(index, 1);
                }
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

        //获取第一屏数据
        $scope.downloadData();
    }];
});