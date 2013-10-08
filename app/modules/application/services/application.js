/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: обнГ2:59
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'application/list/:page', {}, {
            query: {
                method: 'GET'
                , isArray: false
            }
        });
    }];
});