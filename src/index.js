import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorHandler";
import { AppProviders } from "./context";

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <AppProviders>
            <App />
          </AppProviders>
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
