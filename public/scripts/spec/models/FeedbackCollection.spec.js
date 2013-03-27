describe('FeedbackCollection.js spec', function () {
    var collection;

    describe('when constructing', function () {
        describe('just empty', function () {
            beforeEach(function () {
                collection = new FeedbackCollection();
            });

            it('should be created', function () {
                expect(collection).toBeDefined();
            });
        });

        describe('with objects', function () {
            beforeEach(function () {
                var models = [
                    {email: 'a@a.com', website: 'a.com', feedback: 'hello'},
                    {email: 'b@b.com', website: 'b.com', feedback: 'good bye'}
                ];
                collection = new FeedbackCollection(models);
            });

            it('should be lenght of 2', function () {
                expect(collection.length).toBe(2);
            });

            it('should contain models inside', function () {
                expect(collection.models).toBeDefined();
            });
        });

        describe('with models', function () {
            beforeEach(function () {
                var models = [
                    new Feedback({email: 'a@a.com', website: 'a.com', feedback: 'hello'}),
                    new Feedback({email: 'b@b.com', website: 'b.com', feedback: 'good bye'})
                ];
                collection = new FeedbackCollection(models);
            });

            it('should be lenght of 2', function () {
                expect(collection.length).toBe(2);
            });

            it('should contain models inside', function () {
                expect(collection.models).toBeDefined();
            });
        });

        describe('with options', function () {
            beforeEach(function () {
                var models = [
                    {email: 'a@a.com', website: 'a.com', feedback: 'hello'},
                    {email: 'b@b.com', website: 'b.com', feedback: 'good bye'}
                ];
                collection = new Backbone.Collection(models);
            });

            it('should be created', function () {
                expect(collection).toBeDefined();
            });

            it('should have models of Backbone.Model type', function () {
                expect(collection.models[0].constructor).toBe(Backbone.Model);
            });

            describe('while passing model option', function () {
                beforeEach(function () {
                    var models = [
                        {email: 'a@a.com', website: 'a.com', feedback: 'hello'},
                        {email: 'b@b.com', website: 'b.com', feedback: 'good bye'}
                    ];
                    collection = new Backbone.Collection(models, { model: Feedback });
                });

                it('should have models of Feedback type', function () {
                    expect(collection.models[0].constructor).toBe(Feedback);
                });
            });
        });
    });

    describe('when accessing collection elements', function () {
        var first, second, models;

        describe('by index', function () {
            beforeEach(function () {
                models = [
                    {email: 'a@a.com', website: 'a.com', feedback: 'hello'},
                    {email: 'b@b.com', website: 'b.com', feedback: 'good bye'}
                ];
                collection = new FeedbackCollection(models);
            });

            beforeEach(function () {
                first = collection.at(0);
                second = collection.at(1);
            });

            it('should get first model by index', function () {
                expect(first.toJSON()).toEqual(models[0]);
            });

            it('should get second model by index', function () {
                expect(second.toJSON()).toEqual(models[1]);
            });
        });

        describe('by id', function () {
            beforeEach(function () {
                models = [
                    {id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'},
                    {id: 'feedback-2', email: 'b@b.com', website: 'b.com', feedback: 'good bye'}
                ];
                collection = new FeedbackCollection(models);
            });

            beforeEach(function () {
                first = collection.get('feedback-1');
                second = collection.get('feedback-2');
            });

            it('should get first model by id', function () {
                expect(first.toJSON()).toEqual(models[0]);
            });

            it('should get second model by id', function () {
                expect(second.toJSON()).toEqual(models[1]);
            });
        });

        describe('indexer does not work', function () {
            beforeEach(function () {
                models = [
                    {id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'},
                    {id: 'feedback-2', email: 'b@b.com', website: 'b.com', feedback: 'good bye'}
                ];
                collection = new FeedbackCollection(models);
            });

            it('should be undefined', function () {
                expect(collection[0]).not.toBeDefined();
            });
        });
    });

    describe('when adding items', function () {
        beforeEach(function () {
            collection = new FeedbackCollection();
        });

        describe('by add method', function () {
            beforeEach(function () {
                collection.add({id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'});
            });

            it('should be added', function () {
                expect(collection.get('feedback-1')).toBeDefined();
            });

            it('should be converted to model', function () {
                expect(collection.get('feedback-1').constructor).toBe(Feedback);
            });

            describe('with index specified', function () {
                beforeEach(function () {
                    collection.add({id: 'feedback-2', email: 'b@b.com', website: 'b.com', feedback: 'good bye'}, {at: 0});
                });

                it('should have 2 items in collection', function () {
                    expect(collection.length).toBe(2);
                });

                it('should have feedback-2 item at index 0', function () {
                    expect(collection.at(0).id).toBe('feedback-2');
                });
            });
        });

        describe('by push method', function () {
            beforeEach(function () {
                collection.push({id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'});
            });

            it('should be added', function () {
                expect(collection.get('feedback-1')).toBeDefined();
            });

            it('should be converted to model', function () {
                expect(collection.get('feedback-1').constructor).toBe(Feedback);
            });

            describe('with next push', function () {
                beforeEach(function () {
                    collection.push({id: 'feedback-2', email: 'b@b.com', website: 'b.com', feedback: 'good bye'});
                });

                it('should have 2 items in collection', function () {
                    expect(collection.length).toBe(2);
                });

                it('should have feedback-1 item at index 0', function () {
                    expect(collection.at(0).id).toBe('feedback-1');
                });
            });
        });

        describe('add as model', function () {
            beforeEach(function () {
                var model = new Feedback({id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'});
                collection.add(model);
            });

            it('should be added', function () {
                expect(collection.get('feedback-1')).toBeDefined();
            });

            it('should be type of model', function () {
                expect(collection.get('feedback-1').constructor).toBe(Feedback);
            });
        });
    });

    describe('when removing items', function () {
        beforeEach(function () {
            collection = new FeedbackCollection();
        });

        beforeEach(function () {
            collection.push({id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'});
            collection.push({id: 'feedback-2', email: 'b@b.com', website: 'b.com', feedback: 'good bye'});
        });

        describe('by remove method', function () {
            beforeEach(function () {
                var model = collection.get('feedback-1');
                collection.remove(model);
            });

            it('should be removed', function () {
                expect(collection.get('feedback-1')).not.toBeDefined();
            });
        });

        describe('by pop method', function () {
            beforeEach(function () {
                collection.pop();
            });

            it('should be removed', function () {
                expect(collection.get('feedback-2')).not.toBeDefined();
            });
        });
    });

    describe('collection events', function () {
        var listener;

        beforeEach(function () {
            collection = new FeedbackCollection();
        });

        beforeEach(function () {
            listener = jasmine.createSpy();
        });

        describe('while adding elements', function () {
            beforeEach(function () {
                collection.on('add', listener);
            });

            beforeEach(function () {
                collection.add({id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'});
            });

            it ('should raise add event', function () {
                expect(listener).toHaveBeenCalled();
            });
        });

        describe('while pusing elements', function () {
            beforeEach(function () {
                collection.on('add', listener);
            });

            beforeEach(function () {
                collection.push({id: 'feedback-1', email: 'a@a.com', website: 'a.com', feedback: 'hello'});
            });

            it ('should raise add event', function () {
                expect(listener).toHaveBeenCalled();
            });
        });
    });
});