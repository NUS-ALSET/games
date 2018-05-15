import React from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h2>Game 2 {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));
