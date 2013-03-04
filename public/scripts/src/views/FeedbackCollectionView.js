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

    emptyFeedbackTemplate: '\
        <div class="well well-large">No feedback submitted yet...</div>\
    ',

    initialize: function (options) {
        _.bindAll(this);

        if (!(options && options.collection)) {
            throw new Error('collection is required');
        }

        this.collection = options.collection;
        this.collection.on('add', this.feedbackAdded);
    },

    render: function () {
        var empty = this.collection.length === 0;

        return empty ? this.renderEmptyFeedback() : this.renderFeedbackList();
    },

    renderEmptyFeedback: function () {
        this.$el.html(this.emptyFeedbackTemplate);

        return this;
    },

    renderFeedbackList: function () {
        this.list = this.$el.html(this.template).find('.feedback-list');
        this.collection.each(function(feedback) {
            this.list.append(_.template(this.lineTemplate, feedback.toJSON()));
        }, this);

        return this;
    },

    feedbackAdded: function (feedback) {
        this.renderFeedbackList();
    }

});