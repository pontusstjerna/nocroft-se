import io from 'socket.io-client';
// import jsmpeg from 'jsmpeg';

export const connectIO = (url, token) => {
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

        socket.on('unauthorized', () => {
            reject('Unauthorized.');
        })

        socket.on('disconnect', () => reject('Unable to connect to CatHunter server.'));

        socket.on('started', started => resolve({socket: socket, isStarted: started}));

        socket.on('connect', () => {
            setTimeout(() => {
                socket.emit('started');
                clearTimeout(timeout)
            }, 500);
        });
    });
}

export const connectVideoCanvas = (canvas, url, token) => {
    if (!canvas) return;

    url = `${url}`;
    console.log('Connecting to video WS: ' + url);
    return new window.JSMpeg.Player(url, {canvas});
}