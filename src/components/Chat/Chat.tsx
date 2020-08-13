import React, { Component } from 'react';

interface ChatProps { 
  roomId: string,
  userId: string,
  username: string,
  socket: any
}

interface ChatState {
  currentMessage: string
  messages: any[]
}

export default class Chat extends Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    // starts with only boilerplate messages to avoid storing messages for privacy
    var initialMessages: any[] = [
      {
        userId: "0",
        username: "Better Zoom",
        message: "Welcome to the chat feature!"
      }
    ];
    this.state = {
      currentMessage:"",
      messages: initialMessages
    };
  }

  componentDidMount() {
    const { messages } = this.state;
    const { socket } = this.props;
    console.log("Checking for messages");
    socket.on('message-recieved', (userId: string, name: string, message: string) => {
      messages.unshift({
        userId: userId,
        username: name,
        message: message
      });
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
    console.log("Sending message...")
    socket.emit('message-sent', roomId, userId, username, currentMessage);
    console.log("Setting state")
    messages.unshift({
      userId: userId,
      username: username,
      message: currentMessage
    });
    console.log(messages)
    this.setState({ messages: messages, currentMessage: '' })
    console.log("Done")
  }
  
  render() {
    const { currentMessage, messages } = this.state;
    const { username } = this.props;
    return (
      <div className="chat-block">
        <div className="chat-history">
          {messages.map((message, i) =>
            <div key={i}>
              {message.username === username ?
                <div className="my-message">
                  <div className="message-username">
                    {i < messages.length-1 && message.userId === messages[i+1].userId ?
                      <div style={{ paddingBottom: "10px" }}></div>
                      : <>{message.username}</> 
                    }
                  </div>
                  <div className="message-body"
                    style={{ background: "lightblue"}}>
                    {message.message}
                  </div>
                </div>
                : <div className="other-message">
                  <div className="message-username">
                    {i < messages.length-1 && message.userId === messages[i+1].userId ?
                      <div style={{ paddingBottom: "10px" }}></div>
                      : <>{message.username}</> 
                    }
                  </div>
                  <div className="message-body"
                    style={{ background: "lightgrey"}}>
                    {message.message}
                  </div>
                </div>
              }
            </div>
          )}
        </div>
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