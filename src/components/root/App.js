import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProducts from "../products/AddOrUpdateProducts";
import NotFound from "../common/NotFound";

function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Dashboard />}></Route>
        <Route path="/saveproduct/:id" element={<AddOrUpdateProducts />} />
        <Route path="/saveproduct" element={<AddOrUpdateProducts />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
