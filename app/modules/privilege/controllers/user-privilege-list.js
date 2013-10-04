/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-2
 * Time: 上午11:40
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'privilege', '$location', '$routeParams', 'user', 'userPrivilege', function($scope, Auth, Action, Privilege, $location, $routeParams, User, UserPrivilege){
        var page = $routeParams.page - 1;
        $scope.uid = $routeParams.uid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('privilegeUserEdit', 'privilege').success(function(response){
            $scope.switchFlag = response.status;
        });

        //获取用户信息
        $scope.user = User.get({uid: $routeParams.uid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            return response;
        });

        //获取指定权限信息
        $scope.prvData = {isLoading:false, data:{}};
        $scope.fetchInfo = function(id){

            if(angular.isUndefined($scope.prvData.data[id])){
                $scope.prvData.isLoading = true;

                $scope.prvData.data[id] = Privilege.get({pid: id}).$promise.then(function(response){
                    response.privName = decodeURI(response.privName);
                    response.info = decodeURI(response.info);
                    response.app = decodeURI(response.app);
                    response.group = decodeURI(response.group);

                    $scope.prvData.isLoading = false;

                    return response;
                });
            }

            $scope.prvInfo = $scope.prvData.data[id];
        };

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserPrivilege.query({page: ++page, uid: $routeParams.uid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.privName = decodeURI(item.privName);
                    item.app = decodeURI(item.app);
                    item.group = decodeURI(item.group);
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

        //更改有效性
        $scope.changeValidity = function(index, status){

            var promise = UserPrivilege.changStatus({id: $scope.data[index].privId, status: status, uid: $routeParams.uid, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限的有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserList', 'privilege' , {page: 1, uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //更改规则为
        $scope.changeRule = function(index, status){

            var promise = UserPrivilege.changStatus({id: $scope.data[index].privId, status: status, uid: $routeParams.uid, type: 'rule'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限的规则更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserList', 'privilege' , {page: 1, uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].default = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //删除指定用户
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            UserPrivilege.remove({pid: object.privId, uid: $routeParams.uid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户的指定权限删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserList', 'privilege' , {page: 1, uid: uid}));
                            };
                        }($routeParams.uid)
                    });

                }else{
                    //从列表中删除该条数据
                    $scope.data.splice(index, 1);

                    //删除陈功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户的指定权限删除成功!'
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