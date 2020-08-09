import React, { PureComponent } from 'react';
import './App.css';

interface VideoProps { 
  mediaStream: any
}

interface VideoState {}

export default class Video extends PureComponent<VideoProps, VideoState> {
  addMediaStream = (video: any) => {
    const { mediaStream } = this.props;
    // Prevents throwing error upon a setState change when mediaStream is null
    // upon initial render
    if (mediaStream) video.srcObject = mediaStream;
  }
  
  render() {
    const { mediaStream } = this.props;
    //console.log('mediaStream: ', mediaStream);
    return (
      <video
        className="video-element"
        style={{ backgroundColor: 'black'}}
        autoPlay
        ref={mediaStream ? this.addMediaStream : null}
      >
        <track default kind="captions" />
      </video>
    );
  }
};