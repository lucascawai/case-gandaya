import { useNavigate } from "react-router-dom";

import { ChangeEvent, useEffect, useState } from "react";

import { useGetProducts } from "../hooks/products";
import { IProduct } from "../types/product";
import backButton from "../assets/Frame 122242.png";
import searchIcon from "../assets/searchIcon.png";
import { MenuItem } from "../components/MenuItem";
import { useAppSelector } from "../store/hooks";
import { selectAllCart } from "../store/cartSlice";
import { Order } from "../store/ordersSlice";
import { api } from "../services/axios";
import { selectUserId } from "../store/userSlice";

export const Menu = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const userId = useAppSelector(selectUserId);
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.isDefaultPrevented();

    setSearch(event.target.value);
  };

  const productsFiltered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigateAndPostOrder = async () => {
    const orderItems = cart.cartItems.map((cartItem) => {
      return {
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      };
    });

    await api.post<Order>(`/orders/${userId}`, {
      orderItems,
      total: cart.total,
      isAbandoned: true,
    });

    navigate("/checkout");
  };

  return (
    <div className="flex flex-col">
      <div className="fixed left-0 right-0 z-10 bg-[#232323]">
        <div className="flex flex-row justify-between mx-5 mt-5">
          <div onClick={() => navigate(-1)}>
            <img
              src={backButton}
              alt="visualization eye"
              className="rounded-lg"
            />
          </div>
          <div className="text-2xl font-bold text-right">Cardápio</div>
        </div>
        <div className="relative flex mt-5 items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar produto"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-2 border-gandaya-green rounded-lg p-2 mb-4 mx-3 flex-grow bg-gandaya-black"
          />
          <div className="absolute inset-y-0 right-0 mb-4 mr-5 flex items-center pointer-events-none">
            <img src={searchIcon} alt="search Icon" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto mx-2 pt-40 pb-20 flex flex-wrap">
        {productsFiltered.map((product) => {
          return <MenuItem key={product.id} product={product} />;
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-gandaya-black h-20 flex justify-between items-center">
        <div className="ml-6">
          <div className="text-gandaya-gray text-xs">Valor total</div>
          <div className="font-bold text-2xl text-white"> R$ {cart.total}</div>
        </div>
        <div className="mr-6">
          <div
            onClick={() => navigateAndPostOrder()}
            className="bg-gandaya-green rounded-[32px] h-12 w-36 flex justify-center items-center"
          >
            <div className="font-bold text-black">Confirmar</div>
          </div>
        </div>
      </div>
    </div>
  );
};
