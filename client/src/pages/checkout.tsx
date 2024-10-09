import { useNavigate } from "react-router-dom";
import backButton from "../assets/Frame 122242.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCart, selectAllCart } from "../store/cartSlice";
import { CheckoutItem } from "../components/CheckoutItem";
import { IHasSufficientBalance } from "../types/hasSufficientBalance";
import { AxiosResponse } from "axios";
import { api } from "../services/axios";
import { useState } from "react";
import { FailureModal } from "../components/FailureModal";
import { SuccessModal } from "../components/SuccessModal";
import { addNewOrder } from "../store/ordersSlice";

export const Checkout = () => {
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState<"idle" | "pending">(
    "idle"
  );

  const cart = useAppSelector(selectAllCart);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkUserBalance = async () => {
    setIsLoading(true);

    try {
      const response = await api.get<IHasSufficientBalance | null>(
        `/users/${user.id}/check-balance?amount=${cart.total}`
      );
      setIsLoading(false);
      return {
        status: 200,
        checkUserBalanceData: response.data,
      };
    } catch (err) {
      const error = err as AxiosResponse<string>;
      setIsLoading(false);
      return {
        status: error.status,
        error: error.data,
      };
    }
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    console.log(loading);

    const { checkUserBalanceData } = await checkUserBalance();
    if (checkUserBalanceData?.hasSufficientBalance == false) {
      setIsFailureModalOpen(true);
    } else if (checkUserBalanceData?.hasSufficientBalance == true) {
      try {
        setAddRequestStatus("pending");

        const orderItems = cart.cartItems.map((cartItem) => {
          return {
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
          };
        });

        await dispatch(
          addNewOrder({
            orderItems,
            total: cart.total,
            userId: user.id,
          })
        ).unwrap();

        setIsSuccessModalOpen(true);
      } catch (err) {
        console.error("Failed to save the order: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const onCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    dispatch(clearCart());
    navigate("/");
  };

  const onCloseFailure = () => {
    setIsFailureModalOpen(false);
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="fixed left-0 right-0 z-10 bg-[#232323] pb-2">
        <div className="flex flex-row justify-between mx-5 mt-5">
          <div onClick={() => navigate(-1)}>
            <img
              src={backButton}
              alt="visualization eye"
              className="rounded-lg"
            />
          </div>
          <div className="text-2xl font-bold text-right">Checkout</div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mx-5 pt-20 pb-20">
        {cart.cartItems.map((cartItem) => {
          return (
            <CheckoutItem
              key={cartItem.product.id}
              product={cartItem.product}
            />
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gandaya-black h-20 flex justify-between items-center">
        <div className="ml-6">
          <div className="text-gandaya-gray text-xs">Valor total</div>
          <div className="font-bold text-2xl text-white"> R$ {cart.total}</div>
        </div>
        <div className="mr-6">
          <button
            onClick={() => handlePurchase()}
            disabled={addRequestStatus === "pending"}
            className="bg-gandaya-green rounded-[32px] h-12 w-36 flex justify-center items-center"
          >
            <div className="font-bold text-black">Confirmar</div>
          </button>
        </div>
      </div>

      <FailureModal
        show={isFailureModalOpen}
        onClose={onCloseFailure}
        title="Saldo insuficiente"
      />

      <SuccessModal
        show={isSuccessModalOpen}
        onClose={onCloseSuccess}
        title="Compra realizada"
      >
        {user.balance - cart.total}
      </SuccessModal>
    </div>
  );
};
