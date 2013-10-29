/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-25
 * Time: ÏÂÎç5:04
 * To change this template use File | Settings | File Templates.
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'appApi/:aid/:page', {}, {
            query: {
                method: 'GET'
                , isArray: false
            }
            , getSelectList: {
                method: 'GET'
                , params: {aid: 'select'}
                , isArray: true
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