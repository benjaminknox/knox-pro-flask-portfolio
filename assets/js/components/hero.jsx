import React from 'react';

export default class Hero extends React.Component {
  constructor() {
    super();
    this.state = { page: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/v1/hero`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        this.setState({page: response});
      });
  }

  render() {
    return (
      <div className="content">
        <h1>{this.state.page.header}</h1>
        <div className="hero-svg"></div>
        <h2>{this.state.page.tagLine}</h2>
      </div>
    );
  }
}
