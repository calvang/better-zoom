import React, { Component, createRef } from 'react';

interface VideoProps { 
  mediaStream: any
}

interface VideoState {}

export default class Video extends Component<VideoProps, VideoState> {
  videoRef: any;
  constructor(props: VideoProps) {
    super(props);
    this.videoRef = createRef();
  }
  
  // addMediaStream = (video: any) => {
  //   const { mediaStream } = this.props;
  //   // Prevents throwing error upon a setState change when mediaStream is null
  //   // upon initial render
  //   if (mediaStream) video.srcObject = mediaStream;
  // }

  componentDidMount() {
    const { mediaStream } = this.props;
    if (mediaStream) this.videoRef.current.srcObject = mediaStream;
  }
  
  render() {
    //const { mediaStream } = this.props;
    //console.log('mediaStream: ', mediaStream);
    return (
      <video
        className="video-flex-element"
        autoPlay
        // ref={mediaStream ? this.addMediaStream : null}
        ref={this.videoRef}
      >
        <track default kind="captions" />
      </video>
    );
  }
};