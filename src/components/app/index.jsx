import React, { Component } from 'react';
import TitleNav from '../title-nav';
import Controls from '../controls';
import tabs from '../tabs';
import './app.scss';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: 'about',
      selectedTrackId: undefined,
      isPlaying: false,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTrackClick = this.handleTrackClick.bind(this);
  }
  render() {
    const Content = tabs[this.state.activeTabId];
    return (
      <div className="app">
        <div className="app__content">
          <nav>
            <TitleNav
              activeTabId={this.state.activeTabId}
              onTabClick={this.handleTabClick}
            />
          </nav>
          <main>
            {Content && (
              <Content
                onTrackClick={this.handleTrackClick}
                selectedTrackId={this.state.selectedTrackId}
                isPlaying={this.state.isPlaying}
              />
            )}
          </main>
        </div>
        <footer className="app__controls">
          <Controls
            selectedTrackId={this.state.selectedTrackId}
            isPlaying={this.state.isPlaying}
            hasSelection={this.state.selectedTrackId !== undefined}
          />
        </footer>
      </div>
    );
  }
  handleTabClick(tabId) {
    this.setState({ activeTabId: tabId });
  }
  handleTrackClick(track) {
    this.setState({ isPlaying: true, selectedTrackId: track.link });
  }
}

export default AppComponent;