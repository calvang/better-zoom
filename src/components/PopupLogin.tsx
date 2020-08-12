import React from 'react';

interface LoginProps {
  updateUsername: any,
  signIn: any,
  username: any
}

export default function Login(props: LoginProps) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Set username to", props.username);
    props.signIn();
  }

  return (
    <div className="page-header w3-card w3-padding-large">
      <h1>Welcome to Better Zoom!</h1>
      <hr />
      <p>You must choose a username before entering this room:</p>
      <form className="w3-padding"
        onSubmit={handleSubmit}>
        <p><input className="w3-input w3-padding-16" type="text"
          placeholder="Username" required name="Username"
          onChange={props.updateUsername} value={props.username}/></p>
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