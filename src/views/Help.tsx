import React from 'react';

export default function Help() {
  return (
    <div className="page-header w3-card w3-padding-large">
      <h1>Better Zoom Help</h1>
      <hr />
      <h2>Signing in</h2>
      <p>There are two options for signing in: you can either choose a username and room ID, or you can just choose a username and let our service randomly generate a new room and room ID for you. If you opt for entering a room ID, you can either join an existing room with via its unique room ID, or you can create a new room with the room ID you enter.</p>
      <h2>Joining a room via invite link</h2>
      <p>If you use an invite link to join an existing room, you will be prompted to enter a username before joining. Note that rooms are always public, so be wary of sharing room ID's and creating rooms with easily guessed room ID's.</p>
      <a href="/"
            className="w3-button w3-padding menu-bar-button">
            <i className="fa fa-chevron-circle-left  w3-xxlarge" ></i>
      </a>
      <a rel="noopener noreferrer" target="_blank" href="https://github.com/calvang/better-zoom"
            className="w3-button w3-padding menu-bar-button">
            <i className="fa fa-github w3-xxlarge" ></i>
      </a>
    </div>
  );
}