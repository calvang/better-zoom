import React, { Component } from 'react';

interface ChatProps { 
  roomId: string,
  userId: string,
  username: string,
  socket: any
}

interface ChatState {
  currentMessage: string
  messages: any
}

export default class Chat extends Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    // starts with no messages to avoid storing messages for privacy
    this.state = {
      currentMessage:"",
      messages: {}
    };
  }

  componentDidMount() {
    const { messages } = this.state;
    const { socket } = this.props;
    socket.on('message-recieved', (userId: string, name: string, message: string) => {
      messages[userId] = {
        username: name,
        message: message
      };
      console.log("Current messages", messages)
      this.setState({
        messages: messages
      })
    })
  }

  updateMessage = (e: any) => {
    this.setState({ currentMessage: e.target.value })
  }

  handleSend = (e: any) => {
    e.preventDefault();
    const { currentMessage, messages } = this.state;
    const { roomId, userId, username, socket } = this.props;
    socket.emit('message-sent', roomId, userId, username, socket, currentMessage);
    this.setState({ messages: [...messages, currentMessage] })
  }
  
  render() {
    const { currentMessage, messages } = this.state;
    return (
      <div className="message-container">
        {/* {
          messages.map(())
        } */}
        <form className="message-form" onSubmit={this.handleSend} >
          <button className="" type="submit"
            style={{ width: "30px", alignContent: "center" }}>
            <i className="fa fa-paper-plane w3-large"></i>
          </button>
          <input className="" contentEditable="true" type="text"
            style={{}} autoFocus
            placeholder="Message" autoComplete="false" autoCorrect="false"
            onChange={this.updateMessage} value={currentMessage} />
        </form>
      </div>
    );
  }
};