var FeedbackFormView = Backbone.View.extend({
   className: 'row',

    template: '\
        <form>\
            <legend>Share the feedback</legend>\
            <div class="control-group email">\
                <label>Email</label>\
                <input type="text" id="email" placeholder="Your email address...">\
                <span class="help-inline"></span>\
            </div>\
            <div class="control-group website">\
                <label>Web site</label>\
                <input type="text" id="website" placeholder="Your website...">\
                <span class="help-inline"></span>\
            </div>\
            <div class="control-group feedback">\
                <label>Feedback</label>\
                <textarea id="feedback" class="input-xxlarge" placeholder="Feedback text..." rows="6"><%= feedback %></textarea>\
                <span class="help-inline"></span>\
            </div>\
            <button type="submit" id="submit" class="btn">Submit</button>\
        </form>\
    ',

    events: {
        'click #submit': 'submitClicked'
    },

    initialize: function (options) {
        _.bindAll(this);

        if (!this.model) {
            throw new Error('model is required');
        }

        if (!(options && options.feedback)) {
            throw new Error('feedback is required');
        }

        this.feedback = options.feedback;

        this.model.on('invalid', this.showErrors);
    },

    render: function () {
        this.$el.html(_.template(this.template, {feedback: this.feedback}));

        return this;
    },

    submitClicked: function (e) {
        e.preventDefault();

        var me = this;
        var options = {
            success: function () {
                me.hideErrors();
            }
        };

        var feedback = {
            email: this.$('#email').val(),
            website:  this.$('#website').val(),
            feedback: this.$('#feedback').val()
        };

        this.model.save(feedback, options);
    },

    showErrors: function(model, errors) {
        _.each(errors, function (error) {
            var controlGroup = this.$('.' + error.name);
            controlGroup.addClass('error');
            controlGroup.find('.help-inline').text(error.message);
        }, this);
    },

    hideErrors: function () {
        this.$('.control-group').removeClass('error');
        this.$('.help-inline').text('');
    }

});