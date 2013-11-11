/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: 下午2:53
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'userApp', 'application', '$routeParams', '$q', '$modal', function($scope, Auth, Action, UserApp, Application, $routeParams, $q, $modal){
        Auth.isLogined();

        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Application.query({page: ++page}).$promise.then(function(response){

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

        //获取第一屏数据
        $scope.downloadData();

        $scope.form = {ipLimit: 1, uid: $routeParams.uid};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //修改有效性
        $scope.changeIpLimit = function(item, status){

            $scope.form.ipLimit = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //用于触发 应用系统信息 的模态窗口
        $scope.modalWin = function(aid){

            $scope.form.aid = aid; //保存要增加的应用系统pid

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //用于保存新添加的权限信息
        $scope.addNewApp = function(){

            UserApp.create($scope.form).$promise.then(function(response){
                if(response['status'] == 1){
                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '可访问系统添加成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '可访问系统添加失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppAdd', 'user' , {uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});