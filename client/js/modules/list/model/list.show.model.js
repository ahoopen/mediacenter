/* globals Backbone, define */

define([
    'modules/list/collection/list.show.collection'
],function () {

    'use strict';

    var ShowCollection = require('modules/list/collection/list.show.collection');

    return Backbone.Model.extend({

        urlRoot: 'api/list/shows',

        parse: function (response) {

            if (response.items) {
                response.items = new ShowCollection(response.items);
            }

            return response;
        }
    });

});
