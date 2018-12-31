import io from 'socket.io-client';
import jsmpeg from 'jsmpeg';

export const connectIO = (url, token) => {
    return new Promise((resolve, reject) => {
        let socket = io(url, token ? {
            transportOptions: {
                polling: {
                    extraheaders: {
                        'Authorization': 'bearer ' + token,
                    }
                }
            }
        } : {});
    
        socket.on('unauthorized', () => {
            reject('Unauthorized.');
        })

        socket.on('disconnect', () => reject('Unable to connect to CatHunter server.'));

        socket.emit('started');

        socket.on('started', started => resolve(started));

        setTimeout(() => {
            socket.disconnect();
            reject('Timeout: Unable to connect to the CatHunter server.');
        }, 7000);
    });
}

export const connectWS = (canvas, url, token) => {
    url = `ws://${url}/?authorization=${token}`;
    return new jsmpeg(url, {canvas});
}