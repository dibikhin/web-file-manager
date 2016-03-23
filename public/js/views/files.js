define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/files.html'
], function ($, _, Backbone, filesTemplate) {
    'use strict';

    var FileView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template(filesTemplate),

        // The DOM events specific to an item.
        events: {
            'click .destroy': 'clear'
        },

        // The FileView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **File** and a **FileView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        // Re-render the titles of the file item.
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        // Remove the item, destroy the model from server and delete its view.
        clear: function () {
            this.model.destroy();
        }
    });

    return FileView;
});
