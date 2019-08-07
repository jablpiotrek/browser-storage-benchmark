import React, { Component } from 'react';
import PropTypes from 'prop-types';
import storageBenchmark from '../helpers/storage-benchmark';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        min: 1,
        max: 100,
        value: 1,
      },
      number: {
        min: 1,
        max: 200,
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
      <div className="Controls">
        <h2>Set testing parameters</h2>
        <h3>Select storage provider</h3>
        <select
          name="driver"
          onChange={this.handleDriverChange}
          defaultValue="localStorage"
        >
          <option value="IndexedDB">IndexedDB</option>
          <option value="WebSQL">WebSQL</option>
          <option value="localStorage">localStorage</option>
        </select>
        <h3>Number of reads/writes</h3>
        <input
          type="text"
          name="number"
          value={number.value}
          onChange={this.handleChange}
        />
        {errors.number ? errorText(number.min, number.max) : null}
        <h3>Size of single write/read</h3>
        <input
          type="text"
          name="size"
          value={size.value}
          onChange={this.handleChange}
        />
        {errors.size ? errorText(size.min, size.max) : null}
        <button
          type="button"
          onClick={this.handleEvaluate}
          disabled={errors.size || errors.number || isBusy}
        >
          Evaluate results
        </button>
        <button
          type="button"
          onClick={handleClearResults}
        >
          Clear Results
        </button>
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
