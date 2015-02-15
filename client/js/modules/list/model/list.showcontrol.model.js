/* globals Backbone, define */

define([
    //'modules/list/collection/list.controls.collection'
],function () {

    'use strict';

    //var ListControleCollection = require('modules/list/collection/list.controls.collection');

    return Backbone.Model.extend({

        urlRoot: 'api/list/shows/1407/controls',

        initialize : function() {

            //this.urlRoot = 'api/list/shows/'+ ref +'/controls';
        },

        parse: function (response) {

            if (response.items) {
                response.items = new Backbone.Collection(response.items);
            }

            return response;
        }
    });

});
