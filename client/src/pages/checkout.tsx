import { Link, useNavigate } from "react-router-dom";
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

export const Checkout = () => {
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

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

  // const postOrder = async () => {
  //   setIsLoading(true);

  //   try {
  //     await api.post<IOrder | null>(`/orders/${userId}`, {});
  //     setIsLoading(false);
  //     return {
  //       status: 200,
  //     };
  //   } catch (err) {
  //     const error = err as AxiosResponse<string>;
  //     setIsLoading(false);
  //     return {
  //       status: error.status,
  //       error: error.data,
  //     };
  //   }
  // };

  const handlePurchase = async () => {
    setIsLoading(true);
    console.log(loading);
    // setError("");

    const { checkUserBalanceData } = await checkUserBalance();
    if (checkUserBalanceData?.hasSufficientBalance == false) {
      setIsFailureModalOpen(true);
    } else if (checkUserBalanceData?.hasSufficientBalance == true) {
      setIsSuccessModalOpen(true);
      return;
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
      <div className="flex flex-row justify-between">
        <div onClick={() => navigate(-1)}>
          <img
            src={backButton}
            alt="visualization eye"
            className="rounded-lg"
          />
        </div>
        <div className="text-2xl font-bold text-right">Checkout</div>
      </div>
      <>
        <div className="text-xs font-fira">Buscar produtos</div>
      </>
      <>
        <div>
          {cart.cartItems.map((cartItem) => {
            return (
              <CheckoutItem
                key={cartItem.product.id}
                product={cartItem.product}
              />
            );
          })}
        </div>
      </>

      <div className="flex flex-row justify-between">
        <div>{cart.total}</div>
        <div onClick={() => handlePurchase()}>
          <Link to={"/checkout"}>Confirmar</Link>
        </div>
      </div>

      <FailureModal
        show={isFailureModalOpen}
        onClose={onCloseFailure}
        title="Deu mto errado"
      >
        <p>Este é o conteúdo do modal.</p>
      </FailureModal>

      <SuccessModal
        show={isSuccessModalOpen}
        onClose={onCloseSuccess}
        title="Deu mto certo"
      >
        <p>Este é o conteúdo do modal.</p>
      </SuccessModal>
    </div>
  );
};
