import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import PopupLogin from '../components/PopupLogin';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import Dock from '../components/Dock';
import VideoGrid from '../components/Video/VideoGrid';
import Video from '../components/Video/Video';
import Peer from 'peerjs';
import io from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';
import API from '../api.json';

interface MatchParams {
  roomId: string
}

interface WebRTCProps extends RouteComponentProps<MatchParams> {
  username: string
}

interface WebRTCState {
  ROOM_ID: any,
  username: string,
  videoGrid: any,
  volume: number,
  audioOff: boolean,
  videoOff: boolean,
  isLoggedIn: boolean
}

export default class WebRTC extends Component<WebRTCProps, WebRTCState> {
  API_URL: string;
  APP_URL: string;
  isSecure: boolean;
  socket: any;
  myPeer: any;
  peers: any = {};
  myStream: any;
  constructor(props: WebRTCProps) {
    super(props);

    // assign proper peer host and server host
    if (process.env.NODE_ENV === "production") {
      console.log("prod", process.env.PORT)
      this.API_URL = `https://${API.host}`;
      this.APP_URL = `https://${API.host}`;
      this.myPeer = new Peer(undefined, {
        host: API.host,
        port: 9000
      });
      this.isSecure = true;
    }
    else {
      console.log("dev")
      this.API_URL = `http://localhost:5000`;
      this.APP_URL = `http://localhost:3000`;
      this.myPeer = new Peer(undefined, {
        host: "localhost",
        port: 9000
      });
      this.isSecure = false;
    }

    this.socket = io.connect(this.API_URL);
    var roomId: string;
    var isLoggedIn = false;

    // check for room ID and username
    if (props.username !== "") isLoggedIn = true;
    if (this.props.match.params.roomId)
      roomId = this.props.match.params.roomId;
    else {
      // handle random room generation if someone navigates to /room
      roomId = uuidV4();
      var newPath = `/room/${roomId}`
      props.history.push(newPath);
    }
    this.state = {
      ROOM_ID: roomId,
      username: props.username,
      videoGrid: {},
      volume: 1,
      audioOff: false,
      videoOff: false,
      isLoggedIn: isLoggedIn
    };
    this.updateUsername.bind(this);
    this.increaseVolume.bind(this);
    this.decreaseVolume.bind(this);
    this.toggleMute.bind(this);
    this.toggleVideo.bind(this);
  }

  updateUsername = (e: any) => {
    this.setState({ username: e.target.value } );
  }

  signIn = () => {
    console.log("Signing in")
    this.setState({ isLoggedIn: true });
    this.enterRoom();
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;
    console.log(isLoggedIn)
    if (isLoggedIn) this.enterRoom();
  }

  componentWillUnmount() {
    // const { ROOM_ID, username } = this.state;
    // this.socket.emit('disconnect', ROOM_ID, this.myPeer.id, username);
    this.myPeer.disconnect();
    this.socket.disconnect();
  }

  enterRoom = () => {
    const { ROOM_ID, username } = this.state;
    var currentUsers: any[] = [];
    console.log("ROOM_ID and USERNAME:", ROOM_ID, username)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.myStream = stream;
      this.addVideoStream(this.myPeer.id, username, stream);
      this.myPeer.on('call', (call: any) => {
        call.answer(stream);
        // var clients = this.socket.sockets.adapter.rooms[ROOM_ID].sockets;
        call.on('stream', (userVideoStream: any) => {
          let callerId = call.peer;
          // find the matching username for the ID
          var callerUsername;
          for (var clientId in currentUsers) {
            let socketId = this.socket.sockets.connected[clientId].userId;
            if (socketId === callerId)
              callerUsername = this.socket.sockets.connected[clientId].username;
          }
          this.addVideoStream(callerId, callerUsername, userVideoStream);
        })
      })
      this.socket.on('user-connected', (userId: string, name: string) => {
        console.log(userId, "connected");
        this.connectToNewUser(userId, name, stream);
      })
    })
    this.socket.on('user-disconnected', (userId: string) => {
      console.log(userId, "disconnected");
      if (this.peers[userId]) this.peers[userId].close();
    })

    this.myPeer.on('open', (id: string) => {
      console.log("Joined room", ROOM_ID, id, username);
      this.socket.emit('join-room', ROOM_ID, id, username);
    })
    this.socket.on('current-users', (users: any) => {
      console.log(users)
      currentUsers = users;
    })
    // this.socket.on('message-recieved', (userId: string, name: string) => {

    // })
  }

  addVideoStream = (userId: any, username: any, stream: any) => {
    var grid = this.state.videoGrid;
    //var video = <video className="video-element" src={stream} autoPlay preload="metadata"></video>
    var video = <Video mediaStream={stream} volume={this.state.volume} />
    var gridElement = {
      video: video,
      username: username
    }
    grid[`${userId}`] = gridElement;
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

  connectToNewUser = (userId: any, username: any, stream: any) => {
    const call = this.myPeer.call(userId, stream)
    call.on('stream', (userVideoStream: any) => {
      this.addVideoStream(userId, username, userVideoStream);
    })
    call.on('close', () => {
      this.removeVideoStream(userId);
    })
    this.peers[userId] = call
  }

  handleMessageChanged = (e: any) => {
    e.preventDefault();
    
  }

  increaseVolume = () => {
    var volume = this.state.volume;
    if (volume < 1) volume += 0.1
    this.setState({ volume: volume })
  }

  decreaseVolume = () => {
    var volume = this.state.volume;
    if (volume > 0) volume -= 0.1;
    this.setState({ volume: volume })
  }

  toggleMute = () => {
    const { audioOff } = this.state;
    let audioTracks = this.myStream.getAudioTracks();
    // if not muted
    if (audioTracks.length > 0 || !audioOff) {
      this.setState({ audioOff: true });
      this.myStream.removeTrack(audioTracks[0]);
    }
    else {
      this.setState({ audioOff: false });
      navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      })
        .then(stream => {
          let newAudio = stream.getAudioTracks()[0]
          this.myStream.addTrack(newAudio);
        });
    }
  }

  toggleVideo = () => {
    const { videoOff } = this.state;
    let videoTracks = this.myStream.getVideoTracks();
    // if not hidden
    if (videoTracks.length > 0 || !videoOff) {
      this.setState({ videoOff: true })
      this.myStream.removeTrack(videoTracks[0]);
    }
    else {
      this.setState({ videoOff: false });
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
        .then(stream => {
          let newVideo = stream.getVideoTracks()[0]
          this.myStream.addTrack(newVideo);
        });
    }
  }

  render() {
    const { ROOM_ID, username, videoGrid, volume, audioOff, videoOff, isLoggedIn } = this.state;
    const { updateUsername, signIn, increaseVolume, decreaseVolume, toggleMute, toggleVideo } = this;
    //console.log(videoGrid)
    return (
      <>
        {isLoggedIn ?
          <>
            <Logo />
            <Menu
              roomId={ROOM_ID}
              userId={this.myPeer.id}
              username={username}
              users={videoGrid}
              socket={this.socket}
            />
            <VideoGrid videoGrid={videoGrid} />
            <Dock
              toggleMute={toggleMute.bind(this)}
              toggleVideo={toggleVideo.bind(this)}
              increaseVolume={increaseVolume.bind(this)}
              decreaseVolume={decreaseVolume.bind(this)}
              volume={volume}
              isMuted={audioOff}
              isCamOn={videoOff}
              roomLink={`${this.APP_URL}/room/${ROOM_ID}`}
            />
          </>
          : <PopupLogin updateUsername={updateUsername} signIn={signIn} username={username} />
        }
      </>
    )
  }

}