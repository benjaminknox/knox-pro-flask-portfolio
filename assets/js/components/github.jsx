import React from 'react';
import Loader from './loader.jsx';

class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.openGitRepo = this.openGitRepo.bind(this);
  }

  openGitRepo(repo, branch, file) {
    var github = "http://github.com/benjaminknox/",
        url = github + repo + "/blob/" + branch + "/" + file;
    window.open(url, "_blank");
  }

  render() {
    return (
      <div id={this.props.repo} 
           onClick={this.openGitRepo.bind(
               this,
               this.props.repo,
               this.props.branch,
               this.props.file
           )}
           className="code-snippet">
        <div className="code">
          <div className="code-lines"></div>
          <div className="code-line-wrapper">
            <p className="line" dangerouslySetInnerHTML={{__html:this.props.snippet}}></p>
            <div className="last-code-line">...</div>
          </div>
        </div>
        <h4> { this.props.repo } </h4>
      </div>
    );
  }
}

export default class GitHub extends React.Component {
  constructor() {
    super();
    this.state = { files: {} };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/v1/files`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        this.setState({files: response});
      });
  }

  render() {
    var elements = [];
    for(var key in this.state.files) {
      if(this.state.files[key].use === 0) continue; 

      var requestData = this.state.files[key].request.data.repository.object;
      var text = requestData.text.replace(/\n/g,'---');
      var repoRef = this.state.files[key].reference.split(':');
      var branch = repoRef[0];
      var file = repoRef[1];
      text = text.substr(0, text.length - 23);
      text = text.split('---').slice(0, 16)
      text.push("");
      text.forEach(function(line, idx, array) {
        line = line.replace(/ /g, '&nbsp;');
        text[idx] = '<div class="code-line">' + line + '<div class="code-line-number">' + (idx + 1) + '</div></div>';
      });
      text = text.join(' ');
      elements.push(<Snippet 
        key={ key }
        snippet={ text }
        repo={ key }
        branch={ branch }
        file={ file }
      />);
    }

    var loader = "";
    if(elements.length == 0) {
      loader = <Loader />;
    }

    return (
      <div className="content">
        <h3>GitHub Repositories</h3>
        {loader}
        <div className="codeSnippetWrapper">
          {elements}
        </div>
      </div>
    );
  }
}
