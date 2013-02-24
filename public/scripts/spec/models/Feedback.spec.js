describe('Feedback.js spec', function () {
    var model;

    beforeEach(function () {
        model = new Feedback();
    });

    describe('when model is validating', function () {
        var errors;

        describe('when email and feedback fields are absent', function () {
            beforeEach(function () {
                errors = model.validate({});
            });

            it ('should have 2 errors', function () {
                expect(errors.length).toBe(2);
            });

            it ('should have email fields as invalid', function () {
                expect(errors[0].name).toBe('email');
            });

            it ('should have feedback field as invalid', function () {
                expect(errors[1].name).toBe('feedback');
            });
        });

        describe('when email is set, but feedback is absent', function () {
            beforeEach(function () {
                errors = model.validate({ email: 'a@a.com' });
            });

            it ('should have 1 error', function () {
                expect(errors.length).toBe(1);
            });

            it ('should have feedback field as invalid', function () {
                expect(errors[0].name).toBe('feedback');
            });

            it ('should have error message', function () {
                expect(errors[0].message).toBeDefined();
            });
        });

        describe('when feedback is set, but email is absent', function () {
            beforeEach(function () {
                errors = model.validate({ feedback: 'TDD is awesome' });
            });

            it ('should have 1 error', function () {
                expect(errors.length).toBe(1);
            });

            it ('should have email field as invalid', function () {
                expect(errors[0].name).toBe('email');
            });

            it ('should have error message', function () {
                expect(errors[0].message).toBeDefined();
            });
        });

    });

});