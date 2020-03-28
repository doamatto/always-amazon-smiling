function redir () {
    var location0 = window.location.host; // Get current tab URL

    var excludeSites = [
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
    ]; // These sites don't support Amazon Smile, but still have '.amazon.com' in them

    if (excludeSites.some(v => location0.includes(v))) {
        return;
    } // Checks the excluded subdomain list just in case.

    if(location0.includes("amazon.co") || location0.includes("amazon.de")) {
        var location1 = location0.replace(/www./g,''); // Find 'www.' and replace it with blank text
        window.location.replace(`https://smile.${location1}`); // Redirect to Smile page
    }
}