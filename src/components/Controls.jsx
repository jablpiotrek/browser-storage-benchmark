import React, { Component } from 'react';
import PropTypes from 'prop-types';
import storageBenchmark from '../helpers/storage-benchmark';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        min: 1,
        max: 20000,
        value: 1,
      },
      number: {
        min: 1,
        max: 500,
        value: 1,
      },
      errors: {
        number: false,
        size: false,
      },
      driver: 'localStorage',
      resultId: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleDriverChange = this.handleDriverChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // eslint-disable-next-line react/destructuring-assignment
    const { min } = this.state[name];
    // eslint-disable-next-line react/destructuring-assignment
    const { max } = this.state[name];

    this.validate(value, name, max, min);
    this.setState(prevState => ({
      [name]: {
        max: prevState[name].max,
        min: prevState[name].min,
        value,
      },
    }));
  }

  handleDriverChange(event) {
    this.setState({
      driver: event.target.value,
    });
  }

  async handleEvaluate() {
    const { errors, resultId } = this.state;
    const { handleBusyState } = this.props;

    if (!(errors.number && errors.size)) {
      handleBusyState(true);

      this.setState({ resultId: resultId + 1 });
      const { size, number, driver } = this.state;
      const { handleAddResult } = this.props;

      const result = await storageBenchmark(
        Number.parseInt(size.value, 10),
        Number.parseInt(number.value, 10),
        driver,
      );

      handleAddResult({
        data: result,
        id: resultId,
      });

      handleBusyState(false);
    }
  }

  validate(value, name, max, min) {
    this.setState((prevState) => {
      const newError = { [name]: !(value <= max && value >= min) };
      return {
        errors: {
          ...prevState.errors,
          ...newError,
        },
      };
    });
  }

  render() {
    const { size, number, errors } = this.state;
    const { handleClearResults, isBusy } = this.props;
    function errorText(min, max) {
      return `Please enter correct value (Integer, between ${min} and ${max}).`;
    }

    return (
      <div className="controls">
        <h3 className="controls__heading">Set testing parameters</h3>
        <div className="controls__section">
          <h4 className="controls__section-heading">Select storage provider</h4>
          <select
            name="driver"
            onChange={this.handleDriverChange}
            defaultValue="localStorage"
            className="controls__input-select"
          >
            <option value="IndexedDB">IndexedDB</option>
            <option value="WebSQL">WebSQL</option>
            <option value="localStorage">localStorage</option>
          </select>
        </div>
        <div className="controls__section">
          <h4 className="controls__section-heading">Number of write/read operations</h4>
          <input
            type="text"
            name="number"
            value={number.value}
            onChange={this.handleChange}
            className="controls__input"
          />
          {errors.number ? errorText(number.min, number.max) : null}
        </div>
        <div>
          <h4 className="controls__section-heading">Length of single write/read</h4>
          <input
            type="text"
            name="size"
            value={size.value}
            onChange={this.handleChange}
            className="controls__input"
          />
          {errors.size ? errorText(size.min, size.max) : null}
        </div>
        <div className="controls__section">
          <button
            type="button"
            onClick={this.handleEvaluate}
            disabled={errors.size || errors.number || isBusy}
            className="controls__button"
          >
            {isBusy ? 'Working...' : 'Run test'}
          </button>
          <button
            type="button"
            onClick={handleClearResults}
            className="controls__button"
          >
            Clear Results
          </button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  handleAddResult: PropTypes.func.isRequired,
  handleClearResults: PropTypes.func.isRequired,
  handleBusyState: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
};
