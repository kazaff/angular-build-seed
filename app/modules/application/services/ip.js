/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: ÉÏÎç9:08
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'appIp/:aid/:pid/:page', {}, {
            query: {
                method: 'GET'
                , params: {pid: 0}
                , isArray: false
            }
            , changStatus: {
                method: 'POST'
                , params: {aid: 'onlyStatus'}
            }
            , create: {
                method: 'PUT'
            }
            , update: {
                method: 'POST'
                , params: {aid: 'update'}
            }
        });
    }];
});