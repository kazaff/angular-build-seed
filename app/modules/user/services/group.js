/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-14
 * Time: ÉÏÎç8:52
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){

        return $resource(config.domain + 'userGroup/:uid/:gid/:page', {}, {
             groupList: {
                method: 'GET'
                , params: {gid: 0, uid: 0}
            }
            , changStatus: {
                method: 'POST'
                , params: {gid: 'onlyStatus'}
            }
            , remove: {
                method: 'DELETE'
                , params: {uid: 0}
            }
            , create: {
                method: 'PUT'
            }
        });
    }];
});