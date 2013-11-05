/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-11-5
 * Time: ионГ9:00
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'appShow', {});
    }];
});