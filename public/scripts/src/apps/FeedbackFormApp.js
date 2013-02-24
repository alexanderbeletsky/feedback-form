$(function () {
    var collection = new FeedbackCollection();
    collection.fetch({
        success: function (collection) {
            startApp(collection);
        },
        error: function () {
            startApp(collection);
        }
    });

    function startApp(collection) {
        var model = new Feedback();
        var view = new FeedbackFormView ({model: model, feedback: 'Thanks for support!' });
        var collectionView = new FeedbackCollectionView({collection: collection});

        // TODO: refactor
        $('#app').html(view.render().el);
        $('#app').append(collectionView.render().el);
    }
});