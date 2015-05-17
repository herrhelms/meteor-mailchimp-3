# meteor-mailchimp-3
Use MailChimp API 3.0 via meteor

### this package is a placeholder for now

Once ready, you will be able to find it on [atmospherejs.com](https://atmospherejs.com/herrhelms) 

### what's inside 

Custom Sign-up form

### usage

add to your project with
`meteor add herrhelms:meteor-mailchimp-3`

macke sure you have a settings.json object in your projects server directory/scope

```json
{
    "private": {
        "MailChimp": {
            "apiKey": "YOURAPIKEY",
            "listId": "YOURLISTID"
        }
    }
}
```

If you have any questions regarding API Keys or ListIds from MailChimp please take a look at the [MailChimp Knowledge Base](http://kb.mailchimp.com).
