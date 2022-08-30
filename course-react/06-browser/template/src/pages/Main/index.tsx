import React from "react";
import * as api from "../../services/api";

export default class Main extends React.Component {
  async list() {
    try {
      const res = await api.list();
      console.log(res.data);
    } catch (err) {
      console.trace(err);
    }
  }

  componentDidMount() {
    this.list();
  }

  render() {
    return <div>Todo</div>;
  }
}
