var location0 = window.location.host; // Get tab URL

if(location0.includes("amazon.co") || location0.includes("amazon.de")) {
    var location1 = location0.replace(/www./g,''); // Find 'www.' and replace it with blank text
    window.location.replace(`https://smile.${location1}`); // Redirect to Smile page
}