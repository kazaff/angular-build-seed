/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-3
 * Time: 下午2:08
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'action', '$routeParams', '$modal', '$q', 'group', '$location', function($scope, Action, $routeParams, $modal, $q, Group, $location){
        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Group.groupList({page: ++page, group: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.name = decodeURI(item.name);
                    item.parentName = decodeURI(item.parentName);
                    item.bindGroup = decodeURI(item.bindGroup);
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

        //搜索相关的数据
        $scope.searchData = function(){
            page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;

            $location.hash($scope.searchText);

            $scope.downloadData();
        };

        //获取第一屏数据
        $scope.downloadData();

        $scope.form = {group: 1, gid: $routeParams.gid};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //树的配置参数
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'userPrivilege'
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"><img src="./img/plus_alt.png" alt=""/></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                        //用于启动添加权限的模态窗口
                        $scope.modalWin(treeNode.id);

                        $scope.$root.$$phase || $scope.$apply();
                    });
                }
            }
        };

        //更改有效性
        $scope.changeValidity = function(index, status){

            var promise = Group.changStatus({page: page, group: $location.hash()}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户的有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroup', 'user', {page:1}));
                        }
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };


        //用于触发 权限信息 的模态窗口
        $scope.modalWin = function(item){

            $scope.form.pid = item.pid; //保存要增加的权限pid
            $scope.form.parentName = item.name;
            $scope.form.validity = item.validity;
            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //用于保存新添加的权限信息
        $scope.addNewUserGroup = function(){

            Group.create({page: ++page,group :$scope.form}).$promise.then(function(response){
                if(response['status'] != 0){
                        var item=[];
                        item.name = $scope.form.name;
                        item.parentName =$scope.form.parentName;
                        item.bindGroup = $scope.form.bindGroup;
                        item.info = $scope.form.info;
                        $scope.data.push(item);
                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组添加成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组添加失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroupAdd', 'user' , {uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});