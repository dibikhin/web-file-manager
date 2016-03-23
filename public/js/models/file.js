define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var File = Backbone.Model.extend({
        defaults: {
            title: '',
            link: ''
            // size: 0
        }

        // saved by posting form
    });

    return File;
});
