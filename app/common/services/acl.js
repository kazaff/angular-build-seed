/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-6
 * Time: ÏÂÎç4:40
 */
define([
    'config'
], function(config){
    'use strict';

    return ["$http", function($http){
        return {
            verify: function(argument){
                return $http({
                    method: 'GET'
                    , url: config.domain + 'privilege/menu/' + encodeURIComponent(JSON.stringify(argument))
                });
            }
            , status: function(api){
                return $http({
                    method: 'GET'
                    , url: config.domain + 'privilege/api/' + encodeURIComponent(api)
                });
            }
        };
    }];
});