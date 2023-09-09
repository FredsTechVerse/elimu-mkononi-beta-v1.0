import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AlertBoxContextProvider } from "./context/AlertBoxContext";
import { CurrentLessonContextProvider } from "./context/currentLessonContext";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 30, retry: 1 } },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrentLessonContextProvider>
        <AlertBoxContextProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<App />}></Route>
            </Routes>
          </Router>
          <ReactQueryDevtools />
        </AlertBoxContextProvider>
      </CurrentLessonContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
