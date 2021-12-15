import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 5;

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color="#ff0000"
            progress={this.state.progress}
            height={3}
          />
          <Navbar />
          <Switch>
            <Route exact path="/">
              <News
                setProgress={this.setProgress}
                key="general"
                country="in"
                pageSize={this.pageSize}
                category="general"
              />
            </Route>
            <Route exact path="/science">
              <News
                setProgress={this.setProgress}
                key="science"
                country="in"
                pageSize={this.pageSize}
                category="science"
              />
            </Route>
            <Route exact path="/business">
              <News
                setProgress={this.setProgress}
                key="business"
                country="in"
                pageSize={this.pageSize}
                category="business"
              />
            </Route>
            <Route exact path="/sports">
              <News
                setProgress={this.setProgress}
                key="sports"
                country="in"
                pageSize={this.pageSize}
                category="sports"
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                setProgress={this.setProgress}
                key="entertainment"
                country="in"
                pageSize={this.pageSize}
                category="entertainment"
              />
            </Route>
            <Route exact path="/health">
              <News
                setProgress={this.setProgress}
                key="health"
                country="in"
                pageSize={this.pageSize}
                category="health"
              />
            </Route>
            <Route exact path="/technology">
              <News
                setProgress={this.setProgress}
                key="technology"
                country="in"
                pageSize={this.pageSize}
                category="technology"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
