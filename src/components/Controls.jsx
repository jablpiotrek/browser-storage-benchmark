import React, { Component } from 'react';

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
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
    };
  }



  handleChange(event) {
    const { name } = event.target;
    const { value } = event.target;

    this.setState(prevState => ({
      [name]: {
        max: prevState[name].max,
        min: prevState[name].min,
        value: parseInt(value, 10),
      },
    }));
  }

  render() {
    const { size } = this.state;
    const { number } = this.state;

    function error(attribute) {
      if (attribute.value <= attribute.max && attribute.value >= attribute.min) {
        return null;
      }
      return `Enter correct value (Integer, from ${attribute.min} to ${attribute.max})`;
    }

    return (

      <div className="Controls">
        <h2>Set testing parameters</h2>
        <h3>Number of reads/writes</h3>
        <input
          type="text"
          name="number"
          value={number.value}
          onChange={this.handleChange}
        />
        <p>{ error(number) }</p>
        <h3>Size of single write/read</h3>
        <input
          type="text"
          name="size"
          value={size.value}
          onChange={this.handleChange}
        />
        <p>{ error(size) }</p>
      </div>
    );
  }
}
