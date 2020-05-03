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

chrome.webRequest.onBeforeRequest.addListener(function(details){
    var t = details.url.split('.');
    t = t.slice(-2).join('.');

    if( details.url.match(excludes) ) { return; } // Ensure the site can support the redirect
    console.log("https://smile." + t); // Developmental
    return {
        redirectUrl: "https://smile." + t
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