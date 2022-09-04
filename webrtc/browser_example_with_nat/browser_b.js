const offer = {"type":"offer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0 9125721635292587786 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 D7:26:AD:08:BF:86:03:31:91:82:BC:10:8B:11:FB:8F:43:E0:B4:15:E8:7E:FF:41:7F:8E:D3:1E:B9:A2:AF:94\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS *\r\nm=application 49574 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 216.39.253.10\r\na=candidate:0 1 UDP 2122252543 65f3253a-de86-44d6-aaa7-5f63d65e1029.local 60257 typ host\r\na=candidate:3 1 TCP 2105524479 65f3253a-de86-44d6-aaa7-5f63d65e1029.local 9 typ host tcptype active\r\na=candidate:1 1 UDP 1686052863 27.7.147.223 60257 typ srflx raddr 0.0.0.0 rport 0\r\na=candidate:2 1 UDP 92216831 216.39.253.10 49574 typ relay raddr 216.39.253.10 rport 49574\r\na=candidate:2 1 UDP 92216319 216.39.253.10 39516 typ relay raddr 216.39.253.10 rport 39516\r\na=candidate:4 1 UDP 8331263 216.39.253.10 44120 typ relay raddr 216.39.253.10 rport 44120\r\na=sendrecv\r\na=end-of-candidates\r\na=ice-pwd:c4951a693666c544a590efd4a155da5b\r\na=ice-ufrag:5d2fc6c4\r\na=mid:0\r\na=setup:actpass\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}

//set offer const offer = ...
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
  urls: 'turn:my-turn-server.mycompany.com:19403',
  username: 'optional-username',
  credentials: 'auth-token'
})
*/

//stun  server
iceConfigurations.iceServers.push({
  urls: "stun:openrelay.metered.ca:80",
})

const remoteConnection = new RTCPeerConnection(iceConfigurations)

remoteConnection.onicecandidate = e =>  {
console.log(" NEW ice candidate !! on localconnection reprinting SDP " )
 console.log(JSON.stringify(remoteConnection.localDescription) )
}

 
remoteConnection.ondatachannel= e => {

      const receiveChannel = e.channel;
      receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
      receiveChannel.onopen = e => console.log("open!!!!");
      receiveChannel.onclose =e => console.log("closed!!!!!!");
      remoteConnection.channel = receiveChannel;

}


remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))

//create answer
await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a=>
console.log(JSON.stringify(remoteConnection.localDescription)))
//send the anser to the client 