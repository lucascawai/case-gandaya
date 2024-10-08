import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "./layout/default";

import { Wallet } from "./pages/wallet";
import { Menu } from "./pages/menu";
import { Checkout } from "./pages/checkout";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" index element={<Wallet />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
