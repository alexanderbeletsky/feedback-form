var Feedback = Backbone.Model.extend({

    urlRoot: '/feedback',

    validate: function (attrs) {
        var errors = [];

        if (!attrs.email || attrs.email === '') {
            errors.push({name: 'email', message: 'Please fill email field.'});
        }
        if (!attrs.feedback || attrs.feedback === '') {
            errors.push({name: 'feedback', message: 'Please fill feedback field.'});
        }

        return errors.length > 0 ? errors : false;
    }

});