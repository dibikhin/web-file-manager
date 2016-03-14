/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/files',
	'views/files',
	'text!templates/stats.html'
], function ($, _, Backbone, Files, FileView, statsTemplate) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#fileapp',

		// Compile our stats template
		template: _.template(statsTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		// events: {
		// 	'keypress #new-todo':		'createOnEnter',
		// 	'click #clear-completed':	'clearCompleted',
		// 	'click #toggle-all':		'toggleAllComplete'
		// },

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.$footer = this.$('#count');
			this.$main = this.$('#main');
			this.$fileList = this.$('#file-list');

			// this.listenTo(Todos, 'add', this.addOne);
			this.listenTo(Files, 'reset', this.addAll);
			// this.listenTo(Todos, 'change:completed', this.filterOne);
			// this.listenTo(Todos, 'filter', this.filterAll);
			this.listenTo(Files, 'all', _.debounce(this.render, 0));

			Files.fetch({reset:true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
            this.$main.show();
            
			if (Files.length) {
				this.$footer.show();
				this.$footer.html(this.template({
					count: Files.length
				}));
			} else {
				this.$footer.hide();
			}
		},

		// Add a single file item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (file) {
			var view = new FileView({ model: file });
			this.$fileList.append(view.render().el);
		},

		// Add all items in the **Files** collection at once.
		addAll: function () {
			this.$fileList.empty();
			Files.each(this.addOne, this);
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function () {
			return {
				title: this.$input.val().trim(),
				order: Todos.nextOrder(),
				completed: false
			};
		}
	});

	return AppView;
});
