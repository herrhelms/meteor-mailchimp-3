// server stuff
Meteor.startup(function() {

    Meteor.methods({
        mailchimpsubscribe: function(value) {
            var settings = Meteor.settings.private.MailChimp;

            // cancel if no settings
            if (!settings) {
                return false;
            }

            if (!settings.dataCenter) {
                settings.dataCenter = settings.apiKey.split('-')[1];
            }

            var url = "https://" + settings.dataCenter + ".api.mailchimp.com/3.0/lists/" + settings.listId;

            var options = {
                headers: {
                    'Authorization': 'apikey ' + settings.apiKey,
                }
            };

            HTTP.call('get', url, options, function(err, res) {
                console.log(err);
                console.log(res);
            });

        }
    });

});
