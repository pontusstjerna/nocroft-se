import io from 'socket.io-client'

export const connectIO = (token, onError) => {
  return new Promise((resolve, reject) => {
    const socket = io('/robotpi', token ? { auth: { token } } : {})

    const timeout = setTimeout(() => {
      socket.disconnect()
      reject('Timeout: Unable to connect to the CatHunter server.')
    }, 60000)

    socket.on('unauthorized', () => onError('Unauthorized.'))
    socket.on('error', onError)
    socket.on('disconnect', () =>
      onError('Unable to connect to CatHunter server.')
    )
    socket.on('connect_timeout', () =>
      onError('Connection to server timed out.')
    )
    socket.on('reconnect_timeout', () =>
      onError('Connection to server timed out.')
    )

    socket.on('connect', () => {
      resolve({ socket })
    })

  })
}
