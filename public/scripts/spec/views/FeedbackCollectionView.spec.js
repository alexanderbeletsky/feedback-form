describe('FeedbackCollectionView.js spec', function () {
    var view;

    describe('when view is constructing', function () {

        describe('without parameters', function () {

            it ('should throw an exception', function () {
                expect(function () {
                    new FeedbackCollectionView();
                }).toThrow(new Error('collection is required'));
            });

        });

        describe('with parameters', function () {

            beforeEach(function () {
                var collection = new FeedbackCollection();
                view = new FeedbackCollectionView({collection: collection});
            });

            it ('should be initialized', function () {
                expect(view).toBeDefined();
            });

        });

    });

    describe('when view is rendered', function () {

        describe('with empty collection', function () {

            beforeEach(function () {
                var collection = new FeedbackCollection();
                view = new FeedbackCollectionView({collection: collection});
                view.render();
            });

            it ('should create large well', function () {
                expect(view.$el.find('div')).toHaveClass('well well-large');
            });

            it ('should have a message', function () {
                expect(view.$el.find('div')).toHaveText('No feedback submitted yet...');
            });

        });

        describe('with collection', function () {

            beforeEach(function () {
                var collection = new FeedbackCollection();
                collection.add([
                    { email: 'a@a.com', website: 'a.com', feedback: 'a'},
                    { email: 'b@b.com', website: 'b.com', feedback: 'b'}
                ]);
                view = new FeedbackCollectionView({collection: collection});
                view.render();
            });

            it ('should create ul list', function () {
                expect(view.$el.find('ul')).toHaveClass('feedback-list');
            });

            it ('should list contain 2 elements', function () {
                expect(view.$el.find('ul li').length).toBe(2);
            });

        });

    });

});