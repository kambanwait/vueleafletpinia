let targetWebSocket

function connectToWebSocket(TargetsWSUrl) {
  targetWebSocket = new WebSocket(TargetsWSUrl)

  targetWebSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    self.postMessage(data)
  }

  targetWebSocket.onopen = () => {
    console.info('Targets WS connected')
  }

  targetWebSocket.onclose = () => {
    console.info('Targets WS closed')
    targetWebSocket = null
    self.postMessage('re-connect')
  }
}

function closeConnectionToWebSocket() {
  targetWebSocket.close()
}

// When websocket has been closed, we post a message to store to re-connect
self.onmessage = (event) => {
  if (event.data.message === 'connect') {
    // Connect to the WebSocket when WebWorker is loaded
    connectToWebSocket(event.data.TargetsWSUrl)
  }

  if (event.data.message === 'close') {
    closeConnectionToWebSocket()
  }
}
