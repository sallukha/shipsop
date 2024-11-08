import React from 'react';
import { useState } from 'react';
import ProductList from "./componenets/PriductList"
import SideBar from './componenets/SideBar';
import LogIn from './componenets/pages/LogIn';
import SignUp from './componenets/pages/SingUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProduCutRoute from './componenets/ProduCutRoute';
import ProductDatail from './componenets/ProductDatail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [isAuthanticate, setAuthanticate] = useState()
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <Routes>
            <Route path="/product/:id" element={<ProductDatail />} />
            <Route path="/login" element={<LogIn setAuthanticate={setAuthanticate} />} />
            <Route path="/signup" element={<SignUp setAuthanticate={setAuthanticate} />} />
            <Route path="/"
              element={
                <ProduCutRoute isAuthanticate={isAuthanticate}>
                  <ProductList />
                </ProduCutRoute>
              } />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}   // Optional: auto-close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
