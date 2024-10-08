import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { useGetProducts } from "../hooks/products";
import { IProduct } from "../types/product";
import backButton from "../assets/Frame 122242.png";
import { MenuItem } from "../components/MenuItem";
import { useAppSelector } from "../store/hooks";
import { selectAllCart } from "../store/cartSlice";

export const Menu = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const cart = useAppSelector(selectAllCart);
  const navigate = useNavigate();

  const { getProducts } = useGetProducts();

  async function handleGetProducts(): Promise<void> {
    const { productsData } = await getProducts();
    if (productsData) {
      setProducts(productsData);
    }
  }

  useEffect(() => {
    void handleGetProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div onClick={() => navigate(-1)}>
          <img
            src={backButton}
            alt="visualization eye"
            className="rounded-lg"
          />
        </div>
        <div className="text-2xl font-bold text-right">Cardápio</div>
      </div>
      <>
        <div className="text-xs font-fira">Buscar produtos</div>
      </>
      <>
        <div>
          {products.map((product) => {
            return <MenuItem key={product.id} product={product} />;
          })}
        </div>
      </>

      <div className="flex flex-row justify-between">
        <div>{cart.total}</div>
        <div>
          <Link to={"/checkout"}>Confirmar</Link>
        </div>
      </div>
    </div>
  );
};
