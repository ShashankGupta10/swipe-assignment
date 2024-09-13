import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="w-full h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/create" element={<Invoice />} />
        <Route path="/create/:id" element={<Invoice />} />
        <Route path="/edit/:id" element={<Invoice />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
