import React, { Component } from "react";
import axios from "../../axios-instance";

import TreeviewItem from "../../components/TreeviewItem/TreeviewItem";

class TreeviewBoard extends Component {
  state = {
    package: "",
    version: "",
    data: {},
    collapsedBookkeeping: [],
  };

  async fetchValues() {
    const fetchedValues = await axios.get("package/react/16.13.0");
    this.setState({
      data: fetchedValues.data.response,
      package: fetchedValues.data.response.name,
      version: fetchedValues.data.response.version,
    });
  }

  componentDidMount() {
    this.fetchValues();
  }

  handleClick = (i) => {
    let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
    collapsedBookkeeping[i] = !collapsedBookkeeping[i];
    this.setState({ collapsedBookkeeping: collapsedBookkeeping });
  };

  render() {
    let tree = null;

    if (this.state.data.hasOwnProperty("name")) {
      console.log(this.state.data.dependencies[0].name);
      tree = [];
      for (let idx = 0; idx < this.state.data.dependencies.length; idx++) {
        tree.push(
          <TreeviewItem
            key={idx}
            nodeLabel={this.state.package}
            collapse={true}
            click={this.handleClick.bind(null, idx)}
          >
            {this.state.data.dependencies[idx].name} | {this.state.data.dependencies[idx].version}
          </TreeviewItem>
        );
        console.log(this.state.data.dependencies[idx].name);
      }
    }

    return (
      <div>
        <h1>Treeview Board!</h1>
        <h4>
          {this.state.package} | {this.state.version}
        </h4>
        {tree}
      </div>
    );
  }
}

export default TreeviewBoard;
