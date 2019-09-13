import {API_URL} from "../components/pages/login";

export const checkAuth = () => {
    const token = window.sessionStorage.getItem('token-surveillance');
    return new Promise((resolve, reject) => {
        if (!token) {
            reject('No token stored.');
        }

        resolve(fetch(`${API_URL}/login`, {
            headers: {
                'Authorization': 'bearer ' + token,
            }
        }));
    }).then(response => {
        if (!response.ok) {
            throw new Error('Unable to authenticate with token (maybe expired?).')
        } else {
            return response.text();
        }
    }).then(text => {
        return ({
        secretMessage: text,
        token: token,
    })});
};

export const isLoggedIn = () => window.sessionStorage.getItem('token-surveillance') !== null;

export const logout = () => {
    window.sessionStorage.removeItem('token-surveillance');
    window.location = '/';
};

export const login = (username, password) => {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        body: btoa(`${username}:${password}`),
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(response => {
        if (response.ok) {
            setCheckAuthInterval();
            return response.text();
        } else {
            let errorMessage = 'Invalid username or password.';
            switch (response.status) {
                case 504:
                    errorMessage = 'Unable to connect to the server, please try again later.';
                    break;
                default: break;
            }
            throw new Error(errorMessage);
        }
    });
};

// Check authed every 30 sec
const setCheckAuthInterval = () => {
    setTimeout(() => {
        checkAuth().then(authorized => {
            if (authorized) setCheckAuthInterval();
        }).catch(err => {
            console.log(err);
            console.log('Logging out.');
            logout();
        })
    }, 30000);
};