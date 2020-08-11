import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Menu from './Menu';
import Dock from './Dock';
import VideoGrid from './Video/VideoGrid';
import Video from './Video/Video';
import Peer from 'peerjs';
import io from 'socket.io-client';

interface MatchParams {
  roomId: string
}

interface WebRTCProps extends RouteComponentProps<MatchParams> {
  username: string
}

interface WebRTCState {
  videoGrid: any
}

//const ROOM_ID = window.ROOM_ID; //"<%= roomId%>";
//var ROOM_ID: string;
const API_URL = "http://localhost:5000"

export default class WebRTC extends Component<WebRTCProps, WebRTCState> {
  socket: any;
  myPeer = new Peer(undefined, {
    host: 'localhost',
    port: 3001,
    debug: 1
  });
  peers: any = {};
  constructor(props: WebRTCProps) {
    super(props);
    this.socket = io.connect(API_URL);
    this.state = {
      videoGrid: {}
    };
  }

  componentDidMount() {
    const ROOM_ID = this.props.match.params.roomId;
    const { username } = this.props;
    console.log("ROOM_ID and USERNAME:", ROOM_ID, username)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.addVideoStream(this.myPeer.id, stream);
      this.myPeer.on('call', (call: any) => {
        call.answer(stream);
        var callId: any;
        call.on('id', (userCallId: any) => {
          console.log("CALL ID:", userCallId)
          callId = userCallId;
        })
        call.on('stream', (userVideoStream: any) => {
          this.addVideoStream(callId, userVideoStream);
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

  handleMessageChanged = (e: any) => {
    e.preventDefault();
    
  }

  render() {
    const { videoGrid } = this.state;
    //console.log(videoGrid)
    return (
      <>
        <Menu />
        <VideoGrid videoGrid={videoGrid} />
        <Dock />
      </>
    )
  }

}