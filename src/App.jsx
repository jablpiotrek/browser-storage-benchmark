import React, { Component } from 'react';
import Controls from './components/Controls';
import Results from './components/Results';
import './styles/App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };

    this.addResult = this.addResult.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  addResult(result) {
    this.setState(prevState => ({ results: prevState.results.concat(result) }));
  }

  clearResults() {
    this.setState({ results: [] });
  }

  render() {
    const { results } = this.state;
    return (
      <div className="App">
        <Controls
          handleAddResult={this.addResult}
          handleClearResults={this.clearResults}
        />
        <Results
          results={results}
        />
      </div>
    );
  }
}
