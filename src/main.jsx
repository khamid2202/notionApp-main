import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Department from "./components/Department.jsx";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" id="root1" element={<Department />} />
          <Route path="/login" id="root2" element={<App />} />
          <Route path="/department" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </NextUIProvider>
);
