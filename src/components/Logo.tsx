import React from 'react';
import '../css/App.css';

export default function Logo() {
  return (
    <div style={{ zIndex: 3 }}>
      <nav className="w3-top logo">
        <div className="w3-bar-block w3-center">
          <a href="/help" style={{ textDecoration: "none" }}>
            <i className="fa fa-video-camera fa-fw w3-xlarge"></i> Better Zoom
          </a>
        </div>
      </nav>
    </div>
  );
}