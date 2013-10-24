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

        return $resource(config.domain + 'group/:uid/:gid/:page', {}, {
            groupList: {
                method: 'GET'
                , params: {gid: 0, uid: 0}
            }
            ,
            someonegroup: {
                method: 'GET'
                , params: { uid: 0}
            }
            ,changStatus: {
                method: 'POST'
                , params: {uid: 'onlyStatus'}
            }
            , updateData: {
                method: 'POST'
                , params: {uid: 'updateData'}
            }
            , remove: {
                method: 'DELETE'
                , params: {uid: 'delete'}
            }
            , create: {
                method: 'PUT'
            }
            , save: {
                method: 'PUT'
               , params: {uid: 'save'}
            }
        });
    }];
});