import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

interface HomeProps extends RouteComponentProps {
  updateUsername: any,
  username: any
}

export default function Home(props: HomeProps) {
  const [roomId, setRoom] = useState('');

  const updateRoomId = (e: any) => {
    setRoom(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    var newRoom = roomId;
    if (newRoom === '') newRoom = uuidV4();
    var newPath = `/room/${newRoom}`
    props.history.push(newPath);
  }

  return (
    <div className="page-header w3-card w3-padding-large">
      <h1>Welcome to Better Zoom!</h1>
      <p>Enter a username and room ID to begin:</p>
      <form className="w3-padding"
        onSubmit={handleSubmit}>
        <p><input className="w3-input w3-padding-16" type="text"
          placeholder="Username" required name="Username"
          onChange={props.updateUsername} value={props.username}/></p>
        <p><input className="w3-input w3-padding-16" type="text"
          placeholder="Room ID"
          onChange={updateRoomId} value={roomId}/></p>
        <p>
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/calvang/better-zoom"
            className="w3-button w3-padding menu-bar-button">
            <i className="fa fa-github w3-xxlarge" ></i>
          </a>
          <button className="w3-button w3-padding menu-bar-button" type="submit">
            <i className="fa fa-sign-in w3-xxlarge"></i>
          </button>
        </p>
      </form>
    </div>
  );
}