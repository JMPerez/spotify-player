var templateSource = document.getElementById('result-template').innerHTML,
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = document.getElementById('result'),
    loginButton = document.getElementById('btn-login');

const spotifyPlayer = new SpotifyPlayer();
spotifyPlayer.on('update', response => {
    resultsPlaceholder.innerHTML = template(response);
});

loginButton.addEventListener('click', () => {
    loginButton.style.display = 'none';
    spotifyPlayer.init();
});