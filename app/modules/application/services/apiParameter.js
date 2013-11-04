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
        return $resource(config.domain + 'apiParameter/:aid/:apiid/:page', {}, {
            query: {
                method: 'GET'
                , isArray: false
            }
            , remove: {
                method: 'DELETE'
                , params: {aid: 'delete'}
            }
            , create: {
                method: 'POST'
                , params: {page: 'create'}
            }
            , update: {
                method: 'PUT'
                , params: {page: 'update'}
            }
        });
    }];
});