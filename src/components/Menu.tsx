import React, { Component } from 'react';
import Chat from './Chat/Chat';

interface MenuProps {
  roomId: string,
  userId: string,
  username: string,
  users: any,
  socket: any
}

interface MenuState {
  isMenuOpen: boolean,
  showChat: boolean
}

export default class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
      showChat: true
    }
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    isMenuOpen ? this.setState({ isMenuOpen: false }) 
    : this.setState({ isMenuOpen: true });
  }

  viewUsers = () => this.setState({ showChat: false });

  viewChat = () => this.setState({ showChat: true });

  render() {
    const { isMenuOpen, showChat } = this.state;
    const { roomId, userId, username, users, socket } = this.props;
    const sections = [
      {
        icon: "fa fa-users",
        action: this.viewUsers
      },
      {
        icon: "fa fa-comments-o",
        action: this.viewChat
      }
    ]
    return (
      <>
        {isMenuOpen ?
          <div>
            {/*Menu on large screens*/}
            <div className="menu w3-animate-right">
              <div className="menu-bar w3-hover-opacity-on">
                {
                  sections.map((item, i) => {
                    return (
                      <button key={i} className="w3-button w3-padding menu-bar-button"
                        style={{ fontSize: "calc(5px + 2vmin)", paddingTop: "12px", width: "33%" }}
                        onClick={item.action}>
                        <i className={item.icon + " w3-xlarge"}></i>
                      </button>
                    )
                  })
                }
                <button className="w3-button w3-padding menu-bar-button"
                    style={{ width: "33%" }}
                    onClick={this.toggleMenu}>
                    <i className="fa fa-long-arrow-right fa-fw w3-xlarge"></i>
                </button>
              </div>
              {/* <hr style={{ marginTop: "-2px" }} /> */}
              {showChat ? 
                <Chat
                  roomId={roomId}
                  userId={userId}
                  username={username}
                  socket={socket}
                />
                : null
              }
            </div>
          </div> :
          <div>
            <nav className="w3-top menu-toggle w3-hover-opacity-on"
              style={{ width: "auto" }}
              id="mySidebar">
              <div className="w3-bar-block w3-center">
                <button className="w3-bar-item w3-button w3-padding menu-toggle"
                  onClick={this.toggleMenu}>
                  <i className="fa fa-bars fa-fw w3-xlarge"></i>
                </button> 
              </div>
            </nav>
          </div>
        }
      </>

    );
  }
}