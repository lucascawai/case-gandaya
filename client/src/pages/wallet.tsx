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
import { selectUserBalance } from "../store/userSlice";

interface OrderItemExcerptProps {
  orderItem: OrderItem;
}

function OrderItemExcerpt({ orderItem }: OrderItemExcerptProps) {
  return (
    <article key={orderItem.id} className="flex flex-row justify-evenly">
      <div>{orderItem.quantity}</div>
      <div>{orderItem.product.name}</div>
      <div>{orderItem.product.price * orderItem.quantity}</div>
    </article>
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
  }, [orderItemsStatus, dispatch]);

  let content: React.ReactNode;

  if (orderItemsStatus === "pending") {
    content = <div>Carregando...</div>;
  } else if (orderItemsStatus === "succeeded") {
    // Sort orders in reverse chronological order by datetime string
    // const orderedOrders = orderItems
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    content = orderItems.map((orderItem) => (
      <OrderItemExcerpt key={orderItem.id} orderItem={orderItem} />
    ));
  } else if (orderItemsStatus === "rejected") {
    content = <div>{orderItemsError}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold">Carteira</div>
      <>
        <div className="text-xs font-fira">Saldo disponível</div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="">R$</div>
            {visibility ? (
              <div className="">...</div>
            ) : (
              <div>{userBalance}</div>
            )}
          </div>
          <div onClick={handleVisibility}>
            <img
              src={visualizationEye}
              alt="visualization eye"
              className="rounded-lg"
            />
          </div>
        </div>
      </>
      <>
        <div>Histórico de pedidos:</div>
        {content}
      </>
      <>
        <Link to={"/menu"}>Comprar produto</Link>
      </>
    </div>
  );
};
