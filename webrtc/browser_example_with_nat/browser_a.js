const iceConfigurations = {}
iceConfigurations.iceServers = [
  {
    urls: "turn:openrelay.metered.ca:80",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
  {
    urls: "turn:openrelay.metered.ca:443",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
  {
    urls: "turn:openrelay.metered.ca:443?transport=tcp",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
]

//turn server

/*
iceConfiguration.iceServers.push({
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    })
*/

//stun  server
iceConfigurations.iceServers.push({
  urls: "stun:openrelay.metered.ca:80",
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
