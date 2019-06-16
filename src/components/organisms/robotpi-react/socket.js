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

        socket.on('started', started => resolve({socket: socket, isStarted: started}));

        socket.on('connect', () => {
            setTimeout(() => {
                socket.emit('started');
                clearTimeout(timeout)
            }, 500);
        });
    });
}

export const connectVideoCanvas = (canvas, url, token, onError) => {
    if (!canvas) onError('No canvas available.');

    url = `${url}`;
    console.log('Connecting to video WS: ' + url);
    return new window.JSMpeg.Player(url, {
        canvas,
        onStalled: () => onError('Unable to connect to video.')
    });
}