import React, { Component } from 'react';
import '../css/App.css';

interface DockProps {}
interface DockState {
  isMuted: boolean,
  isCamOn: boolean,
  showVolume: boolean,
  showInvite: boolean,
  volume: number
}

export default class Dock extends Component<DockProps, DockState> {
  constructor(props: DockProps) {
    super(props);
    this.state = {
      isMuted: false,
      isCamOn: false,
      showVolume: false,
      showInvite: false,
      volume: 3
    }
  }

  toggleMuted = () => {
    const { isMuted } = this.state;
    isMuted ? this.setState({ isMuted: false }) 
    : this.setState({ isMuted: true });
  }

  toggleCam = () => {
    const { isCamOn } = this.state;
    isCamOn ? this.setState({ isCamOn: false }) 
    : this.setState({ isCamOn: true });
  }

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

  render() {
    const { isMuted, isCamOn, showVolume, volume } = this.state;
    var volumeIcon: any;
    if (volume === 0) volumeIcon = <i className="fa fa-volume-off fa-fw w3-xxlarge"></i>
    else if (volume < 3) volumeIcon = <i className="fa fa-volume-down fa-fw w3-xxlarge"></i>
    else volumeIcon = <i className="fa fa-volume-up fa-fw w3-xxlarge"></i>
    return (
      <div style={{ zIndex: 3 }}>
        <nav className="dock w3-hover-opacity-on"
          id="mySidebar">
          <div className="dock-bar w3-bar w3-center">
            <button className="w3-bar-item w3-button w3-padding"
              onClick={this.toggleMuted}>
              {isMuted ?
                <i className="fa fa-microphone-slash fa-fw w3-xxlarge"></i>
                :  <i className="fa fa-microphone fa-fw w3-xxlarge"></i>
              }
            </button> 
            <button className="w3-bar-item w3-button w3-padding"
              onClick={this.toggleCam}>
              {isCamOn?
                <i className="fa fa-eye-slash fa-fw w3-xxlarge"></i>
                :  <i className="fa fa-video-camera fa-fw w3-xxlarge"></i>
              }
            </button> 
            <button className="w3-bar-item w3-button w3-padding"
              style={{ color: "red" }}>
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
            
          </div>
        </nav>
      </div>
    );
  }
}