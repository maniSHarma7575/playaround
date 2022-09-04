Open two browsers
Open DevTools on both
Paste browser_a.js content in first browser dev tools
Copy the SDP offer generated JSON
Got to the second browser and create "offer" object and set it to the SDP you copied (signled) 
Paste browser_b.js content in second browser dev tools
Go back to First browser (peer A) and paste the content of browser_a_final.js
use sendChannel.send() to send data from Browser A
use remoteConnection.channel.send() to send data from Browser B