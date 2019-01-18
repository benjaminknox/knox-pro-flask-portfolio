import React from 'react';
import Loader from './loader.jsx';




export default class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = { page: [] };
  }

  componentDidMount() {
    fetch(`http://new.knox.pro/api/v1/portfolio`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        this.setState({page: response});
      });
  }

  render() {
    var loader = "";
    console.log("state page length:", this.state.page.length)
    
    if(!this.state.page.header) {
      loader = <Loader />;
    }
    
    return (
      <div className="content">
        <h3>{this.state.page.header}</h3>
        {loader}
      </div>
    );
  }
}