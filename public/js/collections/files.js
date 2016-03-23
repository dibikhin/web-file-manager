define([
    'underscore',
    'backbone',
    'models/file'
], function (_, Backbone, File) {
    'use strict';

    var FilesCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: File,
        
        url: '/files'        
    });

    return new FilesCollection();
});
