import React from 'react';
import '../../css/App.css';

interface VideoGridProps { 
  videoGrid: any
}

export default function VideoGrid(props: VideoGridProps) {
  const { videoGrid } = props;
  return (
    <div className="video-flex w3-padding-large">
      {Object.keys(videoGrid).map((video, i) => 
        <div key={i}>
          {videoGrid[video].video}
        </div>
      )}
    </div>
  )
}