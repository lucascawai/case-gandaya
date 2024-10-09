import { Link } from "react-router-dom";
import visualizationEye from "../assets/visualization.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchOrderItems,
  OrderItem,
  selectAllOrderItems,
  selectOrderItemsError,
  selectOrderItemsStatus,
} from "../store/ordersSlice";
import { fetchUser, selectUserBalance } from "../store/userSlice";
import { dateToFormat } from "../helpers/formatDate";

interface OrderItemExcerptProps {
  orderItem: OrderItem;
}

function OrderItemExcerpt({ orderItem }: OrderItemExcerptProps) {
  return (
    <div key={orderItem.id} className="flex flex-row my-2 items-center">
      <div className="w-12 h-12 font-paytone text-xl rounded-lg border-[#a3a3a3] border-2 flex justify-center items-center">
        {orderItem.quantity}
      </div>
      <div className="flex flex-col ml-2">
        <div className="font-fira font-bold text-base">
          {orderItem.product.name}
        </div>
        <div className="text-xs font-fira font-bold text-gandaya-gray">
          {dateToFormat(orderItem.createdAt)}
        </div>
        <div className="text-gandaya-green font-fira font-bold text-xs">
          {" "}
          R$ {orderItem.product.price * orderItem.quantity}
        </div>
      </div>
    </div>
  );
}

export const Wallet = () => {
  const [visibility, setVisibility] = useState(false);

  const dispatch = useAppDispatch();
  const userBalance = useAppSelector(selectUserBalance);
  const orderItems = useAppSelector(selectAllOrderItems);
  const orderItemsStatus = useAppSelector(selectOrderItemsStatus);
  const orderItemsError = useAppSelector(selectOrderItemsError);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  useEffect(() => {
    if (orderItemsStatus === "idle") {
      dispatch(fetchOrderItems());
    }
    if (orderItemsStatus === "succeeded") {
      console.log(orderItems);
    }
    dispatch(fetchUser());
  }, [orderItemsStatus, dispatch]);

  let content: React.ReactNode;

  if (orderItemsStatus === "pending") {
    content = <div>Carregando...</div>;
  } else if (orderItemsStatus === "succeeded") {
    content = orderItems.map((orderItem) => (
      <OrderItemExcerpt key={orderItem.id} orderItem={orderItem} />
    ));
  } else if (orderItemsStatus === "rejected") {
    content = <div>{orderItemsError}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="fixed left-0 right-0 z-10 bg-[#232323]">
        <div className="text-2xl font-bold text-right mr-5 mt-5">Carteira</div>
        <div className="mt-4">
          <div className="text-xs font-fira text-gandaya-gray ml-5">
            Saldo disponível
          </div>
          <div className="flex flex-row justify-between mx-5">
            <div className="flex flex-row font-fira text-[32px] font-bold">
              <div className="pr-2">R$</div>
              {visibility ? (
                <div className="leading-9">....</div>
              ) : (
                <div>{userBalance}</div>
              )}
            </div>
            <div onClick={handleVisibility} className="">
              <img
                src={visualizationEye}
                alt="visualization eye"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="font-fira text-semibold text-sm text-gandaya-gray ml-5">
            Histórico de pedidos:
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mx-5 pt-40 pb-20">
        {content}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-[#232323] h-20 flex justify-center items-center">
        <Link
          to={"/menu"}
          className="bg-gandaya-green rounded-[32px] h-12 w-64 flex justify-center items-center"
        >
          <div className="font-bold text-black">Comprar produtos</div>
        </Link>
      </div>
    </div>
  );
};
