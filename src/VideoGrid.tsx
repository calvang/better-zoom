import React, { Component } from 'react';
import Video from './Video';
import Peer from 'peerjs';
import io from 'socket.io-client';
import './App.css';

interface VideoGridProps { }
interface VideoGridState {
  videoGrid: any[]
}

const ROOM_ID = "<%= roomId%>"

export default class VideoGrid extends Component<VideoGridProps, VideoGridState> {
  socket: any;
  //videoGrid: any[] = [];
  myPeer = new Peer(undefined, {
      host: 'localhost',
      port: 3001
  })
  myVideo: any;
  peers: any = {}
  constructor(props: VideoGridProps) {
    super(props);
    this.socket = io.connect('localhost:5000')
    this.state = { videoGrid: [] };
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.addVideoStream(stream)
      this.myPeer.on('call', (call: any) => {
        call.answer(stream)
        call.on('stream', (userVideoStream: any) => {
            this.addVideoStream(userVideoStream)
        })
      })
      this.socket.on('user-connected', (userId: any) => {
        console.log(userId, "connected")
        this.connectToNewUser(userId, stream)
      })
    })
    this.socket.on('user-disconnected', (userId: any) => {
      console.log(userId, "disconnected")
      if (this.peers[userId]) this.peers[userId].close()
    })
  
    this.myPeer.on('open', (id: any) => {
      this.socket.emit('join-room', ROOM_ID, id)
    })
  }

  addVideoStream = (stream: any) => {
    const { videoGrid } = this.state;
    //var video = <video className="video-element" src={stream} autoPlay preload="metadata"></video>
    var video = <Video mediaStream={stream}/>
    this.setState({
      videoGrid: [...videoGrid, video]
    });
  }

  removeVideoStream = (index: number) => {
    var grid = this.state.videoGrid;
    delete grid[index];
    this.setState({
      videoGrid: grid
    });
  }

  connectToNewUser = (userId: any, stream: any) => {
    const call = this.myPeer.call(userId, stream)
    const videoIndex = this.state.videoGrid.length;
    call.on('stream', (userVideoStream: any) => {
      this.addVideoStream(userVideoStream);
    })
    call.on('close', () => {
      this.removeVideoStream(videoIndex);
    })
    this.peers[userId] = call
  }

  render() {
    const { videoGrid } = this.state;
    //console.log(videoGrid)
    return (
      <div className="video-grid">
        {videoGrid.map((video, i) => 
          <div key={i}>
            {video}
          </div>
        )}
      </div>
    )
  }

}