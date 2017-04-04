class SpotifyPlayer {
    constructor(options = {}) {
        this.options = options;
        this.listeners = {};
        this.accessToken = null;
        this.loggedIn = false;
    }

    on(eventType, callback) {
        this.listeners[eventType] = this.listeners[eventType] || [];
        this.listeners[eventType].push(callback);
    }

    init() {
        const loop = () => {
            this.fetchPlayer().then(data => {
                this.dispatch('update', data);
            });
        };

        return this.login().then(accessToken => {
            this.accessToken = accessToken;
            this.loggedIn = true;
            this.fetchUser().then(user => {
                this.dispatch('login', user);
                    setInterval(loop.bind(this), 1500);
                    loop();
                });
            });
    }

    login() {
        return new Promise((resolve, reject) => {
            const CLIENT_ID = '37f5082d5ee1489db5cceeaaef7b9691';
            const REDIRECT_URI = 'https://jmperezperez.com/spotify-player/public/callback.html';
            const getLoginURL = (scopes) => {
                return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
            };

            const url = getLoginURL([
                'user-read-playback-state'
            ]);

            const width = 450,
                height = 730,
                left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

            window.addEventListener('message', function(event) {
                const hash = JSON.parse(event.data);
                if (hash.type == 'access_token') {
                    resolve(hash.access_token);
                }
            }, false);

            const w = window.open(url,
                'Spotify',
                'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                );
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    fetchGeneric(url) {
        return fetch(url, {
            headers: { 'Authorization': 'Bearer ' + this.accessToken }
        });
    }

    fetchPlayer() {
        return this.fetchGeneric('https://api.spotify.com/v1/me/player')
            .then(data => data.json())
    }

    fetchUser() {
        return this.fetchGeneric('https://api.spotify.com/v1/me')
            .then(data => data.json())
    }

    dispatch(topic, data) {
        const listeners = this.listeners['topic'];
        if (listeners) {
            listeners.forEach(listener => {
                listener.call(null, data);
            });
        }
    }
}