# Spotify Personal Authentication Module
A Node.js Spotify authorization code flow implementation for local personal use.

## Example Which Plays Your Top Tracks In Spotify Client
```javascript
const spotifyPersonalAuth = require('spotify-personal-auth'),
      SpotifyWebApi = require('spotify-web-api-node');

// Configure module
spotifyPersonalAuth.config({
    clientId : 'YOUR_CLIENT_ID', // Replace with your client id
    clientSecret : 'YOUR_CLIENT_SECRET', // Replace with your client secret
    scope : ['user-modify-playback-state', 'user-top-read'], // Replace with your array of needed Spotify scopes
    path : '/path/to/a/tokens.json' // Optional path to file to save tokens (will be created for you)
});

const api = new SpotifyWebApi();

// Get token promise (call this again later if the token expires, it will refresh if needed)
spotifyPersonalAuth.token().then(token => {
    // Sets api access token
    api.setAccessToken(token);

    // Promise for user's top tracks
    return api.getMyTopTracks();
}).then(data =>
    // Plays user's top tracks
    api.play({
        uris : data['body']['items'].map(item => item['uri'])
    })
).catch(console.log);
```
