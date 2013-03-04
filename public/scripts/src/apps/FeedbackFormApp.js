$(function () {
    var collection = new FeedbackCollection();
    collection.fetch({
        success: function (collection) {
            startApp(collection);
        },
        error: function () {
            debugger;
            startApp(collection);
        }
    });

    function startApp(collection) {
        var model = new Feedback();
        var view = new FeedbackFormView ({model: model, collection: collection, feedback: 'Thanks for support!' });

        $('#app').html(view.render().el);
    }
});