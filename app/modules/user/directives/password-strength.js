/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-16
 * Time: 下午4:51
 */
define(function(){
    'use strict';

    return [function(){
        return {
            restrict: 'E'
            , transclude: true
            , template: '<div class="passwordStrength">' +
                            '<div data-ng-transclude>' +
                                '<div class="progress {{ strongC }} active progress-striped span4">' +
                                    '<div class="bar" style="width: {{ strongW }}%;">{{ strongV }}</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
            , scope: {
                password: '='
            }, controller: function(){
                this.checkStrong = function(psw){
                    var modes = 0;
                    if(psw.length < 6){
                        return modes;
                    }

                    if(/\d/.test(psw)){
                        modes++;
                    }

                    if(/[a-z]/.test(psw)){
                        modes++;
                    }

                    if(/[A-Z]/.test(psw)){
                        modes++;
                    }

                    if(/\W/.test(psw)){
                        modes++;
                    }

                    switch(modes){
                        case 1:
                            return 1;
                        case 2:
                            return 2;
                        case 3:
                        case 4:
                            return psw.length < 12 ? 3 : 4;
                    }
                };

            }, link: function(scope, element, attrs, controller){
                scope.$watch('password', function(psw){
                    var msg = ['危险', '凑合', '不错', '完美'];
                    var className = ['progress-danger', 'progress-warning', 'progress-success', ''];
                    if(!angular.isUndefined(psw)){
                            scope.strong = controller.checkStrong(psw);
                            scope.strongW = scope.strong/4 * 100;
                            scope.strongV = msg[scope.strong-1];
                            scope.strongC = className[scope.strong-1];
                    }else{
                        scope.strongW = 0;
                        scope.strongV = '';
                    }
                });
            }
        };
    }];
});