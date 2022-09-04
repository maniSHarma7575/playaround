const iceConfigurations = {}
iceConfigurations.iceServers = []

//turn server

/*
iceConfiguration.iceServers.push({
  urls: 'turn:my-turn-server.mycompany.com:19403',
  username: 'optional-username',
  credentials: 'auth-token'
})
*/

//stun  server
iceConfigurations.iceServers.push({
  urls: 'stun:stun1.l.google.com:19302' 
})

const localConnection = new RTCPeerConnection(iceConfigurations)

localConnection.onicecandidate = e => {
  console.log("New ice candidate!! on localconnection reprinting SDP")
  console.log(JSON.stringify(localConnection.localDescription))
}

const sendChannel = localConnection.createDataChannel('sendChannel')
sendChannel.onmessage = e => console.log("Message recevied!!! " + e.data)
sendChannel.onopen = e => console.log("Opended!!!");
sendChannel.onclose = e => console.log("closed !!!")


localConnection.createOffer().then(o => localConnection.setLocalDescription(o))
