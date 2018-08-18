import React, { Component } from "react";

import { Input, Button } from "semantic-ui-react";

class TweetSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.title
    };
  }

  setTitle = () => {
    this.props.setSearchTerm(this.state.value);
  };

  handleChange = event => {
    if (event) {
      this.setState({
        value: event.target.value
      });
    }
  };

  render() {
    const { value } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        value={value}
        fluid
        placeholder="Hashtag"
      >
        <input />
        <Button onClick={this.setTitle}>Search</Button>
      </Input>
    );
  }
}

export default TweetSearch;
