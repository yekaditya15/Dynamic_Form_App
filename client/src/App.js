import React from "react";
import { FormProvider } from "./context/FormContext";
import AppContent from "./components/AppContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <FormProvider>
      <div className="App">
        <ToastContainer />
        <AppContent />
      </div>
    </FormProvider>
  );
}

export default App;
