class JSMpegSocketIoSource {
  constructor(url, options) {
    this.destination = null

    this.completed = false
    this.established = false
    this.onConnected = options.onConnected
    this.progress = 0

    // Streaming is obiously true when using a stream
    this.streaming = true

    options.socket.on('video_data', this.write.bind(this))
  }

  connect(destination) {
    this.destination = destination
  }

  start() {
    this.established = true
    this.completed = true
    this.progress = 1
    if (this.onConnected) {
      this.onConnected()
    }
  }

  resume() {
    // eslint-disable-line class-methods-use-this
  }

  destroy() {
    // eslint-disable-line class-methods-use-this
  }

  write(data) {
    this.destination.write(data)
  }
}

export default JSMpegSocketIoSource
