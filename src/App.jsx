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
    this.deleteResult = this.deleteResult.bind(this);
  }

  addResult(result) {
    this.setState(prevState => ({ results: prevState.results.concat(result) }));
  }

  deleteResult(id) {
    const { results } = this.state;
    const newResults = results.filter(result => (result.id !== id));
    this.setState({
      results: newResults,
    });
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
          handleDeleteResult={this.deleteResult}
        />
      </div>
    );
  }
}
