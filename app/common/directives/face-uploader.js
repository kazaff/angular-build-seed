/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-21
 * Time: 上午11:11
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzFaceuploader', ['$modal', '$q', function($modal, $q){
            return {
                restrict: 'A'
                , transclude: true
                , template: '<div data-ng-transclude></div>' +
                            '<div class="fileuploader-tip" data-ng-show="hover">' +
                                '<i class="icon-edit"></i> {{ tip }}' +
                            '</div>'
                , scope: {
                    tip: '@'
                    , save: '&'
                }
                , link: function(scope, element, attrs){
                    scope.hover = false;
                    scope.upload = false;
                    scope.formData = new FormData();
                    scope.loading = false;

                    element.hover(function(eventObject){
                        scope.hover = true;
                        scope.$root.$$phase || scope.$apply();  //避免$digest already in progress
                    }, function(eventObject){
                        scope.hover = false;
                        scope.$root.$$phase || scope.$apply();  //避免$digest already in progress
                    });

                    var modalPromise = $modal({
                        template: 'face.html'
                        , persist: true
                        , show: false
                        , backdrop: 'static'
                        , scope: scope
                    });
                    var modal = $q.when(modalPromise);
                    //用于触发 头像上传 的模态窗口
                    scope.modalWin = function(){
                        modal.then(function(modalEl){
                            modalEl.modal('show');
                        });
                    };

                    var titleDom = angular.element(element.children()[1]);
                    titleDom.on('click', function(event){
                        scope.modalWin();
                    });

                    scope.reset = function(){
                        scope.upload = false;
                        scope.formData = new FormData();
                        jQuery('.face_area .upload_area').removeClass('upload_area_hover');
                    };

                    //文件上传方法
                    scope.uploadFile = function(){
                        scope.loading = true;

                        scope
                            .save({data: scope.formData})
                            .success(function(data, status, headers, config){

                                angular.element(angular.element(element.children()[0]).children()[0]).attr('src', data.file);

                                modal.then(function(modalEl){
                                    modalEl.modal('hide');
                                });
                                scope.loading = false;
                            })
                            .error(function(data, status, headers, config){
                                console.log(data);
                            });
                    };
                }
            };
        }])
        .directive('kzFacearea', [function(){
            return {
                restrict: 'E'
                , replace: true
                , template: '<div class="face_area">' +
                                '<div class="upload_area" data-ng-hide="flag">' +
                                    '<span>拖拽至此</span>' +
                                    '<span> 或 </span>' +
                                    '<span class="btn fileinput-button">' +
                                        '<i class="icon-picture"></i> 选择' +
                                        '<input type="file" name="face" id="face-input" accept="image/gif, image/jpeg, image/x-png, image/x-ms-bmp" />' +
                                    '</span>' +
                                '</div>' +
                                '<div class="img_area" data-ng-show="flag">' +
                                    '<img class="img-polaroid" />' +
                                '</div>' +
                            '</div>'
                , scope: {
                    flag: '=',
                    formdata: '='
                }
                , link: function(scope, element, attrs){

                    var uploadArea = jQuery('.face_area .upload_area');

                    //监听input更改
                    jQuery('#face-input').on('change', function(event){

                        var face = event.target.files[0];

                        //检查文件格式
                        if(!face.type.match('image.*')){
                            return; //todo
                        }

                        scope.formdata.append('face', face);    //把图片放入表单数据中

                        var reader = new FileReader();
                        reader.onload = function(event){
                            jQuery('.face_area .img-polaroid').attr('src', event.target.result);
                        };
                        reader.readAsDataURL(face);

                        scope.flag = true;
                        scope.$root.$$phase || scope.$apply();  //避免$digest already in progress
                    });

                    //监听拖拽区域，注意这里必须使用原始的addEventListener方法，不支持jquery提供的on方法
                    uploadArea[0].addEventListener('dragover', function(event){
                        event.stopPropagation();
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

                        uploadArea.addClass('upload_area_hover');

                    }, false);

                    uploadArea.on('dragleave', function(){
                        uploadArea.removeClass('upload_area_hover');
                    });

                    uploadArea[0].addEventListener('drop', function(event){
                        event.stopPropagation();
                        event.preventDefault();

                        uploadArea.removeClass('upload_area_hover');

                        var face = event.dataTransfer.files[0];

                        //检查文件格式
                        if(!face.type.match('image.*')){
                            return; //todo
                        }

                        scope.formdata.append('face', face);    //把图片放入表单数据中

                        var reader = new FileReader();
                        reader.onload = function(event){
                            jQuery('.face_area .img-polaroid').attr('src', event.target.result);
                        };
                        reader.readAsDataURL(face);

                        scope.flag = true;
                        scope.$root.$$phase || scope.$apply();  //避免$digest already in progress

                    }, false);
                }
            };
        }]);
        return module;
    };

    return {
        initialize: initialize
    };
});