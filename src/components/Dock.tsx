import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface DockProps extends RouteComponentProps {
  toggleMute: any,
  toggleVideo: any,
  increaseVolume: any,
  decreaseVolume: any,
  volume: number,
  isMuted: boolean,
  isCamOn: boolean,
  roomLink: any
}
interface DockState {
  // isMuted: boolean,
  // isCamOn: boolean,
  showVolume: boolean,
  showInvite: boolean
}

class Dock extends Component<DockProps, DockState> {
  input: any;
  constructor(props: DockProps) {
    super(props);
    this.state = {
      // isMuted: false,
      // isCamOn: false,
      showVolume: false,
      showInvite: false
    }
  }

  reloadPage = () => {
    var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    var now = Date.now();
    var timeDiff = currentDocumentTimestamp + 1000;
    if (now > timeDiff) {
        window.location.reload();
    }
  }

  leaveRoom = () => {
    this.props.history.push('/');
    this.reloadPage();
  }

  // toggleMuted = () => {
  //   const { isMuted } = this.state;
  //   const { decreaseVolume, increaseVolume, volume } = this.props;
  //   if (isMuted) {
  //     this.setState({ isMuted: false });
  //     while (volume < 1) increaseVolume();
  //   }
  //   else {
  //     this.setState({ isMuted: true });
  //     while (volume > 0) decreaseVolume();
  //   }
  // }

  // toggleCam = () => {
  //   const { isCamOn } = this.state;
  //   isCamOn ? this.setState({ isCamOn: false }) 
  //   : this.setState({ isCamOn: true });
  // }

  toggleVolume = () => {
    const { showVolume } = this.state;
    showVolume ? this.setState({ showVolume: false }) 
    : this.setState({ showVolume: true });
  }

  toggleInvite = () => {
    const { showInvite } = this.state;
    showInvite ? this.setState({ showInvite: false }) 
    : this.setState({ showInvite: true });
  }

  copyInvite = () => {
    const el = this.input;
    el.select();
    document.execCommand("copy");
  }

  render() {
    const { showVolume, showInvite } = this.state;
    const {
      decreaseVolume, increaseVolume,
      toggleMute, toggleVideo, volume,
      isCamOn, isMuted, roomLink
    } = this.props;
    var volumeIcon: any;
    if (volume === 0) volumeIcon = <i className="fa fa-volume-off fa-fw w3-xxlarge"></i>
    else if (volume < 0.5) volumeIcon = <i className="fa fa-volume-down fa-fw w3-xxlarge"></i>
    else volumeIcon = <i className="fa fa-volume-up fa-fw w3-xxlarge"></i>
    return (
      <div style={{ zIndex: 3 }}>
        <nav className="dock w3-hover-opacity-on">
          <div className="dock-bar w3-bar w3-center">
            <button className="w3-bar-item w3-button w3-padding"
              onClick={toggleMute}>
              {isMuted ?
                <i className="fa fa-microphone-slash fa-fw w3-xxlarge"></i>
                :  <i className="fa fa-microphone fa-fw w3-xxlarge"></i>
              }
            </button> 
            <button className="w3-bar-item w3-button w3-padding"
              onClick={toggleVideo}>
              {isCamOn?
                <i className="fa fa-eye-slash fa-fw w3-xxlarge"></i>
                :  <i className="fa fa-video-camera fa-fw w3-xxlarge"></i>
              }
            </button> 
            <button className="w3-bar-item w3-button w3-padding"
              onClick={this.leaveRoom} style={{ color: "red" }}>
              <i className="fa fa-sign-out fa-fw w3-xxlarge"></i>
            </button>
            <button className="w3-bar-item w3-button w3-padding"
              onClick={this.toggleInvite}>
              <i className="fa fa-share fa-fw w3-xxlarge"></i>
            </button>
            <button className="w3-bar-item w3-button w3-padding"
              onClick={this.toggleVolume}>
              {volumeIcon}
            </button>
            {showVolume ? 
              <>
                <button className="w3-bar-item w3-button w3-padding"
                  onClick={decreaseVolume}>
                  <i className="fa fa-minus-circle fa-fw w3-xxlarge"></i>
                </button>
                <button className="w3-bar-item w3-button w3-padding"
                  onClick={increaseVolume}>
                  <i className="fa fa-plus-circle fa-fw w3-xxlarge"></i>
                </button>  
              </> : null
            }
          </div>
        </nav>
        {showInvite ?
          <div className="invite">
            <div className="dock-bar w3-bar w3-center">
              <b className="w3-bar-item w3-padding">
                Share this room:
              </b>
              <input className="w3-bar-item invite-input" type="text"
                  ref={(input) => this.input = input} value={roomLink} />
              <button className="w3-bar-item w3-button invite-button" 
                onClick={this.copyInvite}>
                <i className="fa fa-clipboard fa-fw w3-large"></i>
              </button>
            </div>
          </div>: null
        }
      </div>
    );
  }
}

export default withRouter<DockProps, any>(Dock)