import React, { Component } from 'react';
import Video from './Video';
import Peer from 'peerjs';
import io from 'socket.io-client';
import '../css/App.css';

interface VideoGridProps { }
interface VideoGridState {
  videoGrid: any
}

//const ROOM_ID = window.ROOM_ID; //"<%= roomId%>";
const ROOM_ID = "<%= roomId%>"

export default class VideoGrid extends Component<VideoGridProps, VideoGridState> {
  socket: any;
  myPeer = new Peer(undefined, {
    host: 'localhost',
    port: 3001
  });
  peers: any = {};
  constructor(props: VideoGridProps) {
    super(props);
    this.socket = io.connect('localhost:5000');
    this.state = { videoGrid: {} };
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.addVideoStream(0, stream);
      this.myPeer.on('call', (call: any) => {
        call.answer(stream);
        call.on('stream', (userVideoStream: any) => {
          this.addVideoStream(Math.floor(Math.random() * 1000), userVideoStream);
        })
      })
      this.socket.on('user-connected', (userId: any) => {
        console.log(userId, "connected");
        this.connectToNewUser(userId, stream);
      })
    })
    this.socket.on('user-disconnected', (userId: any) => {
      console.log(userId, "disconnected");
      if (this.peers[userId]) this.peers[userId].close();
    })
  
    this.myPeer.on('open', (id: any) => {
      console.log("Joined room", ROOM_ID, id);
      this.socket.emit('join-room', ROOM_ID, id);
    })
  }

  addVideoStream = (userId: any, stream: any) => {
    var grid = this.state.videoGrid;
    //var video = <video className="video-element" src={stream} autoPlay preload="metadata"></video>
    var video = <Video mediaStream={stream} />
    grid[`${userId}`] = video;
    console.log("ADDED", userId, "to room")
    this.setState({
      videoGrid: grid
    });
  }

  removeVideoStream = (userId: any) => {
    var grid = this.state.videoGrid;
    console.log(grid)
    delete grid[`${userId}`];
    console.log("REMOVED", userId, "from room", grid)
    this.setState({
      videoGrid: grid
    });
  }

  connectToNewUser = (userId: any, stream: any) => {
    const call = this.myPeer.call(userId, stream)
    call.on('stream', (userVideoStream: any) => {
      this.addVideoStream(userId, userVideoStream);
    })
    call.on('close', () => {
      this.removeVideoStream(userId);
    })
    this.peers[userId] = call
  }

  render() {
    const { videoGrid } = this.state;
    //console.log(videoGrid)
    return (
      <div className="video-grid w3-padding-large">
        {Object.keys(videoGrid).map((video, i) => 
          <div key={i}>
            {videoGrid[video]}
          </div>
        )}
      </div>
    )
  }

}