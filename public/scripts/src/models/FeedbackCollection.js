var FeedbackCollection = Backbone.Collection.extend({
    model: Feedback,
    url: '/feedback'
});