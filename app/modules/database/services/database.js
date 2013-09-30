/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-24
 * Time: ÏÂÎç3:22
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'database/:file/:page', {file: '@file'}, {
            query:{
                method: 'GET'
                , isArray: false
            },
            delete:{
                method: 'DELETE'
                , isArray: false
            } ,
            backup:{
                method: 'PUT'
                , isArray: false
            },
            recover:{
                method: 'POST'
                , isArray: false
            }
        });
    }];
});

