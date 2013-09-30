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

        return $resource(config.domain + 'user/:uid/:page', {uid: '@id'}, {
            updateSelf: {
                method: 'POST'
                , params: {uid: 'self'}
            }
            , updateSelfPsw: {
                method: 'POST'
                , params: {uid: 'selfPsw'}
            }
            , authSelf: {
                method: 'POST'
                , params: {uid: 'selfAuth'}
            }
            , userList: {
                method: 'GET'
                , params: {uid: 0}
            }
            , changStatus: {
                method: 'POST'
                , params: {uid: 'onlyStatus'}
            }
            , remove: {
                method: 'DELETE'
            }
        });
    }];
});