import React, { Component } from "react";
import axios from "../../axios-instance";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import TreeviewItem from "../../components/TreeviewItem/TreeviewItem";

class TreeviewBoard extends Component {
  state = {
    package: "",
    version: "",
    data: {},
    collapsedBookkeeping: [],
    form: {
      package: {
        type: "text",
        placeholder: "NPM package",
        value: "",
      },
      version: {
        type: "text",
        placeholder: "Version",
        value: "",
      },
    },
  };

  async fetchValues(name, version) {
    const fetchedValues = await axios.get("package/"+name+"/"+version);
    this.setState({
      data: fetchedValues.data.response,
      package: fetchedValues.data.response.name,
      version: fetchedValues.data.response.version,
    });
  }

  componentDidMount() {
    this.fetchValues("react", "16.13.0");
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.form,
    };

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ form: updatedOrderForm });
  };

  searchHandler = (event) => {
    //Avoid to send the request
    event.preventDefault();
    if(this.state.form.package.value !== '' && this.state.form.version.value){
      console.log(this.state.form.package);
      this.fetchValues(this.state.form.package.value, this.state.form.version.value);
      
    }
    
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let tree = null;
    if (this.state.data.name) {
      tree = [];
      for (let idx = 0; idx < this.state.data.dependencies.length; idx++) {
        tree.push(
          <div key={idx}>
            <TreeviewItem
              item={this.state.data.dependencies[idx]}
              id={idx}
            ></TreeviewItem>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Treeview Board!</h1>

        <form onSubmit={this.searchHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              config={formElement.config}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
          <Button>Search</Button>
        </form>
        <h4>
          {this.state.package} | {this.state.version}
        </h4>
        {tree}
      </div>
    );
  }
}

export default TreeviewBoard;
