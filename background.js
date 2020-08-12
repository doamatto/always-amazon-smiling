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

chrome.webRequest.onBeforeRequest.addListener((details) => {
  if(details.url.match(excludes)) return; // Ensure the site can support the redirect

  var t = details.url; // Fetch base
  try {
    t = t.replace(/https:\/\/|http:\/\//gi, ""); // Remove protocol
  } catch(err) {
    return console.error("[Always-Amazon-Smiling] Not using HTTP(S) protocol; not continuing");
  }
  if(t.startsWith("www.")) {
    t = t.replace("www.", ""); // Strip www.
  }
  var s = t.split("/")[0]; // Keep domain
  t = t.replace(s, ""); // Removes domain from chunk

  return {
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