/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: 上午8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q','$modal', '$filter', 'api','apiParameter', 'application', function($scope, Auth, Action, $location, $routeParams, $q,$modal, $filter, Api,ApiParameter, Application){
        Auth.isLogined();

        $scope.aid = $routeParams.aid;
        $scope.apiId = $routeParams.apiid;
        $scope.pid = $routeParams.pid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = false;
        $scope.data = [];

        //获取应用系统信息
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            $scope.app = response;
        });

        //获取应用系统API信息
        $scope.api = {};
        Api.getApiInfo({aid: $routeParams.aid,apiid: $routeParams.apiid}).$promise.then(function(response){
            response.info = decodeURI(response.info);
            response.requestName = decodeURI(response.requestName);
            $scope.api = response;
        });

        //获取选择方式列表
        $scope.select = {};
        $scope.parameter = {type:true,apiAddrValidity:false };
        Api.getSelectList({page:0}).$promise.then(function(response){
            $scope.parameter.selected= response[1];
            $scope.select = response;
            ApiParameter.query({aid: $routeParams.aid, apiid: $routeParams.apiid,pid: $routeParams.pid}).$promise.then(function(response){
                $scope.parameter = response;
                $scope.parameter.parameterCN = decodeURI(response.parameterCN);
                $scope.data=$scope.parameter.output;
                for(var i=0;i<$scope.select.length;i++){
                    if($scope.select[i].id==$scope.parameter.selected.id){
                        $scope.parameter.selected=  $scope.select[i];
                    }
                }
                $scope.pristine = angular.copy($scope.parameter);
            });
        });


        $scope.pristine = angular.copy($scope.parameter);

        $scope.reset = function(){
            $scope.parameter = angular.copy($scope.pristine);
        };

        $scope.form = {isHidden:false};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //用于触发 权限信息 的模态窗口
        $scope.modalWin = function(){

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.parameter, $scope.pristine);
        };

        $scope.add = function(){
            var formObj = angular.copy($scope.form);
            $scope.data.push(formObj);
        };

        //修改参数类型
        $scope.changeValidity = function(index, status){

            $scope.parameter.type = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //修改是否隐藏字段
        $scope.changeHidden = function(index, status){

            $scope.form.isHidden = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;
            $scope.parameter.output=$scope.data;
            //去后端更新
            var formData = {
                apiid:$routeParams.apiid
                , aid:$routeParams.aid
                ,pid:$routeParams.pid
                , type: $scope.parameter.type
                , apiAddrValidity: $scope.api.requestType
                , selected: $scope.parameter.selected
                , parameterEN: $scope.parameter.parameterEN
                , parameterCN: $scope.parameter.parameterCN
                , apiAddr: $scope.parameter.apiAddr
                , output: $scope.parameter.output
            };
            //去后端更新
            ApiParameter.update(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统修改API参数成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.parameter);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统修改API参数失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid,apiid,pid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiParameterEdit', 'application' , {aid: aid}, {apiid: apiid} ,{pid: pid}));
                            };
                        }($routeParams.aid,$routeParams.apiid,$routeParams.pid)
                    });
                }
            });
        };

        //删除指定参数
        $scope.delete = function(index){
            //从列表中删除该条数据
            $scope.data.splice(index, 1);
        };
    }];
});