const offer = {"type":"offer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-99.0 4183602310674722658 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 21:FD:94:79:71:8B:16:1D:92:CA:7B:73:F4:E6:E2:9E:B5:34:54:0D:3C:4D:A2:28:61:66:34:C8:31:B4:E0:D4\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS *\r\nm=application 57601 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 115.99.136.246\r\na=candidate:0 1 UDP 2122252543 5bc81191-dc9c-4920-854c-62755131fb5e.local 57601 typ host\r\na=candidate:2 1 TCP 2105524479 5bc81191-dc9c-4920-854c-62755131fb5e.local 9 typ host tcptype active\r\na=candidate:1 1 UDP 1686052863 115.99.136.246 57601 typ srflx raddr 0.0.0.0 rport 0\r\na=sendrecv\r\na=end-of-candidates\r\na=ice-pwd:3ee2a7f845ad424508d29c349e3e93ef\r\na=ice-ufrag:3a3fd80d\r\na=mid:0\r\na=setup:actpass\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}

//set offer const offer = ...
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