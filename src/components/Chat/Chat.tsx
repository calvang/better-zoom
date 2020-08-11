import React, { Component } from 'react';

interface ChatProps { 
  mediaStream: any
}

interface ChatState {}

export default class Chat extends Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
  }

  componentDidMount() {

  }
  
  render() {
 
    return (
      <div className="message-container">

        <form>
          <input className="w3-input" type="text" placeholder="Message"/>
        </form>
      </div>
    );
  }
};