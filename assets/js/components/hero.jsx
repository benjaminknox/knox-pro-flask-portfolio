import React from 'react';

export default class Hero extends React.Component {
  constructor() {
    super();
    this.state = { page: [] };
  }

  componentDidMount() {
    fetch(`http://knox.pro:5151/api/v1/hero`)
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
        <img className="hero-svg" src={require('../../images/hero.svg')}/>
        <h2>{this.state.page.tagLine}</h2>
        <div className="arrow">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"> 
            <path className="white-path-shadow" d="M0,2 V 30 L 50,100 50,100 100,30 V 2 H 0 Z" vectorEffect="non-scaling-stroke"/> 
            <path className="white-path" d="M0,0 V 10 L 50,80 50,80 100,10 V 0 H 0 Z" vectorEffect="non-scaling-stroke"/> 
          </svg>
        </div>
      </div>
    );
  }
}
