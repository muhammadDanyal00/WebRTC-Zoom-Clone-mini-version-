// Define a class for managing the WebRTC peer connection mean p2p connection
class PeerService {
  constructor() {
    // Initialize the RTCPeerConnection instance with ICE servers
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            // These STUN servers assist WebRTC peers in establishing direct connections by discovering their public IP addresses and negotiating the best route for communication.
            urls: [
              "stun:stun.l.google.com:19302", // Google's STUN server
              "stun:global.stun.twilio.com:3478", // Twilio's STUN server
            ],
          },
        ],
      });
    }
  }

  // Method to generate an answer to an offer received from a remote peer
  async getAnswer(offer) {
    if (this.peer) {
      // Set the remote description from the offer
      await this.peer.setRemoteDescription(offer);
      // Create an answer and set it as the local description
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  // Method to set the local description of the peer
  async setLocalDescription(ans) {
    if (this.peer) {
      // Set the remote description from the provided answer
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  // Method to generate an offer for initiating a connection with a remote peer
  async getOffer() {
    if (this.peer) {
      // Create an offer and set it as the local description
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

// Create and export a single instance of the PeerService class
export default new PeerService();
