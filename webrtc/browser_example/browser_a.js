const localConnection = new RTCPeerConnection()

localConnection.onicecandidate = e => {
  console.log("New ice candidate!! on localconnection reprinting SDP")
  console.log(JSON.stringify(localConnection.localDescription))
}

const sendChannel = localConnection.createDataChannel('sendChannel')
sendChannel.onmessage = e => console.log("Message recevied!!! " + e.data)
sendChannel.onopen = e => console.log("Opended!!!");
sendChannel.onclose = e => console.log("closed !!!")


localConnection.createOffer().then(o => localConnection.setLocalDescription(o))
