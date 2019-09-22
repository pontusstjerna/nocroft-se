import io from 'socket.io-client';
// import jsmpeg from 'jsmpeg';

export const connectIO = (url, token, onError) => {
    return new Promise((resolve, reject) => {
        let socket = io(url, token ? {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Authorization': 'bearer ' + token,
                    }
                }
            }
        } : {});

        const timeout = setTimeout(() => {
            socket.disconnect();
            reject('Timeout: Unable to connect to the CatHunter server.');
        }, 7000);

        socket.on('unauthorized', () => onError('Unauthorized.'));
        socket.on('error', onError);
        socket.on('disconnect', () => onError('Unable to connect to CatHunter server.'));
        socket.on('connect_timeout', () => onError('Connection to server timed out.'));
        socket.on('reconnect_timeout', () => onError('Connection to server timed out.'));

        socket.on('started', started => resolve({socket, started: JSON.parse(started)}));

        socket.on('connect', () => {
            setTimeout(() => {
                socket.emit('started');
                clearTimeout(timeout)
            }, 500);
        });
    });
};