// client stuff

var callbacks = {
    onFocus: function() {
       // console.log('on focus');
    },
    onBlur: function() {
       // console.log('on blur');
    },
    onKeyup: function(value) {
       // console.log('on Keyup ' + value);
    },
    onSubmit: function() {
       // console.log('on submit');
    }
};

var validEmail = function(inputValue) {
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!EMAIL_REGEXP.test(inputValue);
};

Meteor.startup(function() {
    Template.mailchimpsubscribeform.events({
        'focus ': function(evt, tpl) {
            if (callbacks.onFocus) {
                callbacks.onFocus();
            }
        },
        'blur input': function(evt, tpl) {
            if (callbacks.onBlur) {
                callbacks.onBlur();
            }
        },
        'keyup input': function(evt, tpl) {
            var suggestedValue = evt.currentTarget.value;
            var button = tpl.find('button');
            var input = tpl.find('input');

            if (validEmail(suggestedValue)) {
                button.removeAttribute('disabled');
                button.className = button.className + ' is-valid';
                input.className = input.className + ' is-valid';
            } else {
                button.setAttribute('disabled', true);
                button.className = button.className.replace(' is-valid','');
                input.className = input.className.replace(' is-valid','');
            }

            if (callbacks.onKeyup) {
                callbacks.onKeyup(suggestedValue);
            }
        },
        'submit form': function(evt, tpl) {
            var button = tpl.find('button');
            var input = tpl.find('input');
            var value = input.value;

            input.value = '';
            input.setAttribute('placeholder', 'Thank you for subscribing');
            input.setAttribute('disabled', true);
            input.className = input.className.replace(' is-valid','');

            button.setAttribute('disabled', true);
            button.className = button.className.replace(' is-valid','');

            Meteor.call('mailchimpsubscribe', value, function(err, res) {

                if (!err && res) {
                    alert('subscribed ' + value);

                    if (callbacks.onSubmit) {
                        callbacks.onSubmit();
                    }

                }
                throw new Meteor.Error( 500, 'There was an error subscribing to mailchimp with ' + value);

            });


            evt.preventDefault();
            evt.stopPropagation();
            return false;
        }
    });
});
