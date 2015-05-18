// Write your package code here!

var filter = {except: 'front'};

if (Meteor.isClient) {
    UI.registerHelper('gridRow', function() {
        _.defaults(this, {span: 1, classes: ''});
        this.classlist = 'grid-form-row ' + this.classes;
        return Template._gridRow;
    });
}

if (Meteor.isServer) {
    var serverRoute = function(req, res, next) {

        var query = this.params.query;
        var that = this;

        if (!query.key || query.key && query.key.length === 0) {
            res.end("401 - Request denied. AuthToken is missing!");
        }

        var hasApiKey = APIStorage.findOne({auth: query.key});

        if (hasApiKey && typeof hasApiKey === 'object') {
            console.log('Middleware successfully called on server (' + APISetup.useWhere + ') with ' + req.method + ' of url: ', req.url);
            that.next();
        }

        res.end("401 - Request denied. AuthToken not found!");
    };

    Meteor.startup(function() {
        Router.onRun(serverRoute, _.extend(filter, {where: 'server'}));
    });
}
