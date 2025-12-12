import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Order from "./order";
import OrderDetail from "./orderDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/orderDetail/:id" element={<OrderDetail />} />
    </Routes>
  );
}

export default App;
