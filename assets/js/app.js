import React from 'react';
import ReactDOM from 'react-dom';
import Hero from './components/hero.jsx';
import GitHub from './components/github.jsx';
import Portfolio from './components/portfolio.jsx';

ReactDOM.render(<Hero />, document.getElementById('hero'));
ReactDOM.render(<GitHub />, document.getElementById('github'));
ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
