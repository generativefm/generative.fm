import React, { Component } from 'react';
import TitleNav from '../title-nav';
import Controls from '../controls';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTabId: 'tracks' };
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  render() {
    return (
      <div>
        <TitleNav
          activeTabId={this.state.activeTabId}
          onTabClick={this.handleTabClick}
        />
        <Controls />
      </div>
    );
  }
  handleTabClick(tabId) {
    this.setState({ activeTabId: tabId });
  }
}

export default AppComponent;
