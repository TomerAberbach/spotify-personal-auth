const auth = require('./index'),
  SpotifyWebApi = require('spotify-web-api-node')

// Configure module
auth.config({
  clientId: 'YOUR_CLIENT_ID', // Replace with your client id
  clientSecret: 'YOUR_CLIENT_SECRET', // Replace with your client secret
  scope: ['user-modify-playback-state', 'user-top-read'], // Replace with your array of needed Spotify scopes
  path: '/path/to/a/tokens.json' // Optional path to file to save tokens (will be created for you)
})

const api = new SpotifyWebApi()

/* Get token promise, the token will refresh if this is called when it has expired,
 * But you can get the refresh token if you would rather handle it
 * It is resolve as an array containing the token and refresh as shown below
 */
auth.token().then(([token, refresh]) => {
  // Sets api access and refresh token
  api.setAccessToken(token)
  api.setRefreshToken(refresh)

  return api.getMyTopTracks()
}).then(data =>
  // Plays user's top tracks
  api.play({
    uris: data['body']['items'].map(item => item['uri'])
  })
).catch(console.log)