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
        console.log(response.status);
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

export const logout = () => {
    window.sessionStorage.removeItem('token-surveillance');
    window.location = "#/admin";
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
            return response.text();
        } else {
            let errorMessage = 'Invalid username or password.';
            switch (response.status) {
                case 504:
                    errorMessage = 'Unable to connect to the server, please try again later.';
                    break;
                default: break;
            }
            console.log(response.status);
            throw new Error(errorMessage);
        }
    });
};