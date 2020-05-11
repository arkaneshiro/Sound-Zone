import React from "react";
import { Provider } from "react-redux";
import Welcome from "./components/Welcome";

function App({ store }) {
  return (
    <Provider store={store}>
      <Welcome />
    </Provider>
  );
}

export default App;
