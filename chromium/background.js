// These sites don't support Amazon Smile, but still have '.amazon.com' in them
var excludes = [
    'advertising.',
    'affiliate-program.',
    'alexa.',
    'amzn_photos_web_us',
    'aws.',
    'developer.',
    'ignite.',
    'kdp.',
    'music.',
    'payments.',
    'read.',
    'twitch.',
    'videodirect.',
    'acx.',
    'audible.',
];

browser.webRequest.onBeforeRequest.addListener(function(details){
    var t;
    var s = details.url.split('.');
    s = s.slice(-2).join('.');
    if(details.url.match(/^https?:\/\/[^\/]+([\S\s]*)/)[1] === "/") {
        t = "";
    } else {
        t = details.url.match(/^https?:\/\/[^\/]+([\S\s]*)/)[1];
    }

    if( details.url.match(excludes) ) { return; } // Ensure the site can support the redirect
    return {

        // The first regexp will solve for the domain (amazon.co[.uk]m or amazon.de)
        // The second regexp will solve for the location (everything after and including the '/')

        redirectUrl: "https://smile." + s + t
    };
}, {
    urls: [ // Sites to run on
        '*://www.amazon.com/*',
        '*://www.amazon.co.uk/*',
        '*://www.amazon.de/*',
        '*://amazon.com/*',
        '*://amazon.co.uk/*',
        '*://amazon.de/*',
    ],
    types: [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "image",
        "object",
        "xmlhttprequest",
        "other"
      ]
}, ["blocking"]);