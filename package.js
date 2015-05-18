Package.describe({
    name: 'herrhelms:meteor-mailchimp-3',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/herrhelms/meteor-mailchimp-3.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.imply('iron:router@1.0.7');
    api.addFiles('meteor-mailchimp-3.js');
    api.addFiles(['client/mailchimp.js'], 'client');
    api.addFiles(['server/mailchimp.js'], 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('herrhelms:meteor-mailchimp-3');
    api.addFiles('meteor-mailchimp-3-tests.js');
});
