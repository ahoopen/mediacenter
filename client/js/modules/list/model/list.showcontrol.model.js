/* globals Backbone, define */

define([
    //'modules/list/collection/list.controls.collection'
],function () {

    'use strict';


    return Backbone.Model.extend({

        parse: function (response) {

            if (response.items) {
                response.items = new Backbone.Collection(response.items);
            }

            return response;
        }
    });

});
