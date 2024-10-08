import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { fetchUser } from "./store/userSlice.ts";

function start() {
  store.dispatch(fetchUser());

  const root = createRoot(document.getElementById("root")!);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

start();
