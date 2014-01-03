/**
 * Created by admin on 14-1-3.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', function($scope, Auth){
        Auth.isLogined();

    }];
});