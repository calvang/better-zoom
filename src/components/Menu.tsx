import React, { Component } from 'react';

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
    const sections = [
      {
        component: "",
        icon: "fa fa-comments-o",
        action: ""
      },
      {
        component: "",
        icon: "fa fa-users",
        action: ""
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
                        style={{ fontSize: "calc(5px + 2vmin)", paddingTop: "12px", width:"33%" }}>
                        <i className={item.icon + " w3-xlarge"}></i>
                      </button>
                    )
                  })
                }
                <button className="w3-button w3-padding menu-bar-button"
                    style={{ width: "33%" }}
                    onClick={this.toggleMenu}>
                    <i className="fa fa-bars fa-fw w3-xxlarge"></i>
                </button>
              </div>
            </div>
          </div> :
          <div style={{ zIndex: 3 }}>
            <nav className="w3-top menu-toggle w3-hover-opacity-on"
              style={{ width: "auto" }}
              id="mySidebar">
              <div className="w3-bar-block w3-center">
                <button className="w3-bar-item w3-button w3-padding menu-toggle"
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