# Spotify Player

A node.js server plus a light JS library to create integrations with the [Spotify Web API Connect endpoints](https://developer.spotify.com/web-api/web-api-connect-endpoint-reference/).

## Using the library

Import the script `https://spotify-player.herokuapp.com/spotify-player.js`. Now you can log the user in and listen to updates on playback:

```js
var spotifyPlayer = new SpotifyPlayer();

spotifyPlayer.on('update', response => {
  // response is a json object obtained as a response of
  // https://developer.spotify.com/web-api/get-information-about-the-users-current-playback/
});

spotifyPlayer.on('login', user => {
  if (user === null) {
    // there is no user logged in or the user was logged out
  } else {
    // the user is logged in
    // user is a json object obtained as a response of
    // https://developer.spotify.com/web-api/get-current-users-profile/
  }
});

loginButton.addEventListener('click', () => {
    spotifyPlayer.login();
});

logoutButton.addEventListener('click', () => {
    spotifyPlayer.logout();
});

spotifyPlayer.init();
```

Have a look at http://codepen.io/jmperez/pen/MmwObE for an example of a visualization using this library.

The library uses a shared server to issue the initial access token and refreshed tokens. This means your integration could reach Spotify's rate limits easily. If you want to have more control on this, deploy the code to your own server using the following instructions.

## Server

The server can be run locally and also deployed to Heroku. You will need to register your own Spotify app and pass the credentials to the server. For that:

1. Create an application on [Spotify's Developer Site](https://developer.spotify.com/my-applications/).
2. Add as redirect uris both `http://localhost:5000/callback` (for development) and `<production_domain>/callback` (if you want to deploy your app somewhere)
3. Keep the client ID and client secret somewhere. You'll need them next.

### Running Locally

Make sure you have [Node.js](http://nodejs.org/).

```sh
$ npm install
$ CLIENT_ID=<your_client_id> CLIENT_SECRET=<your_client_secret> REDIRECT_URI=<your_redirect_uri> npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

You will need to have the [Heroku CLI](https://cli.heroku.com/) installed.
 
```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

You will then need to set the environment variables [using `heroku config:set`](https://devcenter.heroku.com/articles/nodejs-support#environment-variables):
```
$ heroku config:set CLIENT_ID=<your_client_id>
$ heroku config:set CLIENT_SECRET=<your_client_secret>
$ heroku config:set REDIRECT_URI=<your_redirect_uri>
