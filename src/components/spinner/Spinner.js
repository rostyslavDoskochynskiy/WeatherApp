import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div className="lds-spinner">
        {Array.apply(null, Array(12)).map((e, i) => (
          <div className="lds-spinner__items" key={i} />
        ))}
      </div>
    );
  }
}
