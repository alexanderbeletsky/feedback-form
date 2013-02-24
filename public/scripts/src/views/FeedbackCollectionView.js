var FeedbackCollectionView = Backbone.View.extend({
    template: '\
        <ul class="feedback-list">\
        </ul>\
    ',

    lineTemplate: '\
        <li class="feedback">\
            <div class="email">\
                <a href="mailto:<%= email %>"><%= email %></a>\
            </div>\
            <div class="site">\
                <a href="<%= website %>"><%= website %></a>\
            </div>\
            <p class="feedback-body">\
                <%= feedback %>\
            </p>\
        </li>\
    ',

    initialize: function (options) {
        if (!(options && options.collection)) {
            throw new Error('collection is required');
        }

        this.collection = options.collection;
    },

    render: function () {
        var empty = this.collection.length === 0;

        return empty ? this.renderEmptyFeedback() : this.renderFeedbackList();
    },

    renderEmptyFeedback: function () {
        this.$el.addClass('well well-large').text('No feedback submitted yet...');

        return this;
    },

    renderFeedbackList: function () {
        var list = this.$el.html(this.template).find('.feedback-list');
        this.collection.each(function(feedback) {
            list.append(_.template(this.lineTemplate, feedback.toJSON()));
        }, this);

        return this;
    }

});