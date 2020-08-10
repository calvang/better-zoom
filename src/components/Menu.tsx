import React, { Component } from 'react';
import '../css/App.css';

interface MenuProps {}
interface MenuState {
  isMenuOpen: boolean,
}

export default class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    isMenuOpen ? this.setState({ isMenuOpen: false }) 
    : this.setState({ isMenuOpen: true });
  }

  render() {
    const { isMenuOpen } = this.state;
    const links = [
      {
        link: "/#",
        label: "HOME",
        icon: "fa fa-home"
      },
      {
        link: "/#/Projects",
        label: "PROJECTS",
        icon: "fa fa-code"
      },
      {
        link: "/#/Blog",
        label: "BLOG",
        icon: "fa fa-user"
      },
      {
        link: "/#/Contact",
        label: "CONTACT",
        icon: "fa fa-envelope"
      }
    ]
    return (
      <>
        {isMenuOpen ?
          <div style={{ zIndex: 3 }}>
            {/*Menu on large screens*/}
            <div className="w3-top w3-small w3-right">
              <div className="w3-animate-left w3-bar w3-black w3-opacity w3-hover-opacity-off w3-center w3-medium">
                <button className="w3-bar-item w3-button w3-padding"
                  style={{ width: "100px" }}
                  onClick={this.toggleMenu}>
                  <i className="fa fa-bars fa-fw w3-xxlarge"></i>
                </button>
                {
                  links.map((page, i) => {
                    return (
                      <a key={page.label} href={page.link} className="w3-bar-item w3-button"
                        style={{ fontSize: "calc(5px + 2vmin)", paddingTop: "12px", width:"22.5%" }}>
                        <i className={page.icon + " w3-xlarge"}></i>
                        {" " + page.label}
                      </a>
                    )
                  })
                }
              </div>
            </div>
          </div> :
          <div style={{ zIndex: 3 }}>
            <nav className="w3-top menu-button w3-hover-opacity-on"
              style={{ width: "auto" }}
              id="mySidebar">
              <div className="w3-bar-block w3-center">
                <button className="w3-bar-item w3-button w3-padding menu-button"
                  onClick={this.toggleMenu}>
                  <i className="fa fa-bars fa-fw w3-xxlarge"></i>
                </button> 
              </div>
            </nav>
          </div>
        }
      </>

    );
  }
}