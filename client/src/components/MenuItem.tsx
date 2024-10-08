import { ReactElement } from "react";
import { Product } from "../store/ordersSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartUpdated, selectCartItemById } from "../store/cartSlice";

interface MenuItemProps {
  product: Product;
}

export function MenuItem({ product }: MenuItemProps): ReactElement {
  const dispatch = useAppDispatch();
  const cartItemQuantity = useAppSelector((state) =>
    selectCartItemById(state, product.id)
  );

  const handleCartItemQuantity = (quantity: number) => {
    if (cartItemQuantity) {
      const newQuantity = cartItemQuantity.quantity + quantity;
      if (newQuantity >= 0 && newQuantity <= product.quantityInStock) {
        dispatch(cartUpdated({ product, quantity }));
      }
    } else {
      if (quantity && product.quantityInStock) {
        dispatch(cartUpdated({ product, quantity }));
      }
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div>
        <div>{product.name}</div>
        <div>{product.price}</div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="mx-2" onClick={() => handleCartItemQuantity(-1)}>
          -
        </div>
        <div className="mx-2">
          {cartItemQuantity ? cartItemQuantity.quantity : 0}
        </div>
        <div className="mx-2" onClick={() => handleCartItemQuantity(1)}>
          +
        </div>
      </div>
    </div>
  );
}
