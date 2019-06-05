import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Controls from './controls';
import HelpTabComponent from './help-tab';
import TitleNavContainer from '@containers/title-nav.container';
import AboutTabContainer from '@containers/about-tab.container';
import PiecesTabContainer from '@containers/pieces-tab.container';
import RecordTabContainer from '@containers/record-tab.container';
import './app.scss';

const AppComponent = () => {
  return (
    <Router>
      <div className="app">
        <div className="app__content">
          <div>
            <main>
              <Switch>
                <Route exact path="/" component={PiecesTabContainer} />
                <Route exact path="/about" component={AboutTabContainer} />
                <Route exact path="/help" component={HelpTabComponent} />
                <Route exact path="/record" component={RecordTabContainer} />
                <Route
                  path="/music/:filter"
                  render={({ match }) => (
                    <PiecesTabContainer filter={match.params.filter} />
                  )}
                />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

// return (
//   <Router>
//     <div className="app">
//       <div className="app__content">
//         <div>
//           <nav>
//             <TitleNavContainer />
//           </nav>
//           <main>
//             <Switch>
//               <Route exact path="/" component={PiecesTabContainer} />
//               <Route exact path="/about" component={AboutTabContainer} />
//               <Route exact path="/help" component={HelpTabComponent} />
//               <Route exact path="/record" component={RecordTabContainer} />
//               <Route
//                 path="/music/:filter"
//                 render={({ match }) => (
//                   <PiecesTabContainer filter={match.params.filter} />
//                 )}
//               />
//               <Route render={() => <Redirect to="/" />} />
//             </Switch>
//           </main>
//         </div>
//       </div>
//       <footer className="app__controls">
//         <Controls />
//       </footer>
//     </div>
//   </Router>
// );

export default AppComponent;
