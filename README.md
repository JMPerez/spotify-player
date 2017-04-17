# Spotify Player

A server plus a light library to create integrations with the [Spotify Web API Connect endpoints](https://developer.spotify.com/web-api/web-api-connect-endpoint-reference/).

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

spotifyPlayer.init();
```

Have a look at http://codepen.io/jmperez/pen/MmwObE for an example of a visualization using this library.

The library uses a shared server to issue the initial access token and refreshed tokens. This means your integration could reach Spotify's rate limits easily. If you want to have more control on this, deploy the code to your own server using the following instructions.

## Server

The server can be run locally and also deployed to Heroku.

### Running Locally

Make sure you have [Node.js](http://nodejs.org/).

```sh
$ npm install
$ npm start
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
