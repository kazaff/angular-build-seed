/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ÏÂÎç2:45
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'auth', '$http', function($scope, Auth, $http){
        Auth.isLogined();

        $scope.test = function(element){

           $http({method:'GET', url: config.domain + 'database/', params: {'download': 1}, responseType: 'arraybuffer', transformResponse: function(data, headersGetter){
               // if(headersGetter('Content-Disposition')){

                    var blob = new Blob([data], {type: "application/octet-stream"});
                    saveAs(blob, 'hello.png');
               //}
           }});
        };
    }];
});