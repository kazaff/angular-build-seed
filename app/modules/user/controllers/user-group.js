/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-30
 * Time: 上午9:14
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', '$location', 'auth', 'action', 'group', '$modal', '$q', '$filter', function($scope, $routeParams, $location, Auth, Action, Group,$modal, $q, $filter){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.uid = $routeParams.uid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('userEdit', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });
        Action.link('userGroupBind', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });

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

        $scope.form = {group: 1, gid: $routeParams.gid};
        $scope.bindForm = {group: 1, gid: $routeParams.gid};
        var bindModalPromise = $modal({
            template: 'bindform.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);
        var bindModal = $q.when(bindModalPromise);
        //树的配置参数
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onMouseDown: onMouseDown
             }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'userGroup'
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                        //用于启动添加权限的模态窗口
                        $scope.modalWin(treeNode.id);
                        $scope.$root.$$phase || $scope.$apply();
                    });
                }
            }
        };

        $scope.checkedSetting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onMouseDown: onMouseDown
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'userGroup'
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                        //用于启动添加权限的模态窗口
                        $scope.bindModalWin(treeNode.id);
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

        //搜索相关的数据
        $scope.searchData = function(){
            page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;

            $location.hash($scope.searchText);
        };

        //删除指定用户
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            Group.remove({gid: object.groupId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroup', 'user' , {page:1}));
                        }
                    });

                }else{
                    //从列表中删除该条数据
                    $scope.data.splice(index, 1);

                    //删除陈功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户删除成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };



        //触发编辑的模态窗口
        $scope.modalWin = function(row){

            $scope.updateRow = row;   //用于指向当前编辑的规则数据对象，用于更新显示列表
             $scope.form.name = row.name;
            $scope.form.parentName = row.parentName;
            $scope.form.validity = row.validity;
            $scope.form.pid = row.id;
            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };
        //触发编辑的模态窗口
        $scope.bindModalWin = function(row){

            $scope.updateRow = row;   //用于指向当前编辑的规则数据对象，用于更新显示列表
            $scope.bindForm.name = row.name;
            $scope.bindForm.parentName = row.parentName;
            $scope.bindForm.validity = row.validity;
            $scope.bindForm.pid = row.id;
            bindModal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

            function onMouseDown(event, treeId, treeNode) {
                if(treeNode!=null)
                {
                    $scope.form.parentName = treeNode.name;
                    $scope.$root.$$phase || $scope.$apply();  //避免$digest already in progress
                }
        }
        //更新指定规则的有效时间
        $scope.updateDate = function(){
            Group.changStatus($scope.form).$promise.then(function(response){
                if(response['status'] != 0){
                    $scope.updateRow.name =$scope.form.name;
                    $scope.updateRow.parentName = $scope.form.parentName;
                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组有效性更改成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroup', 'user' , {uid: uid, page: 1}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };

        //更新指定规则的有效时间
        $scope.editSave = function(){
            Group.changStatus($scope.form).$promise.then(function(response){
                if(response['status'] != 0){
                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组有效性更改成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroup', 'user' , {uid: uid, page: 1}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
        //获取第一屏数据
        $scope.downloadData();
    }];
});