import { ReactElement } from "react";
import { Product } from "../store/ordersSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartUpdated, selectCartItemById } from "../store/cartSlice";

interface MenuItemProps {
  product: Product;
}

export function MenuItem({ product }: MenuItemProps): ReactElement {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    selectCartItemById(state, product.id)
  );

  const handleCartItemQuantity = (quantity: number) => {
    if (cartItem) {
      const newQuantity = cartItem.quantity + quantity;
      if (newQuantity >= 0 && newQuantity <= product.quantityInStock) {
        dispatch(cartUpdated({ product, quantity }));
      }
    } else {
      if (quantity > 0 && product.quantityInStock) {
        dispatch(cartUpdated({ product, quantity }));
      }
    }
  };

  return (
    <div className="flex flex-col mx-2 relative w-28 mb-4">
      <div className="w-28 h-28 rounded-lg bg-white border-2 border-gandaya-green flex justify-center">
        // fetch images from some bucket
        <div className="absolute top-24 flex flex-row justify-between bg-gandaya-green rounded-lg border-2 border-gandaya-green">
          <div
            className="mx-2 flex-1 bg-gandaya-green text-black"
            onClick={() => handleCartItemQuantity(-1)}
          >
            -
          </div>
          <div className="px-2 flex-1 bg-white text-black font-fira">
            {cartItem?.quantity ? cartItem.quantity : 0}
          </div>
          <div
            className="mx-2 flex-1 bg-gandaya-green text-black"
            onClick={() => handleCartItemQuantity(1)}
          >
            +
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="font-bold text-xs text-wrap">{product.name}</div>
        <div className="font-medium text-xs text-gandaya-green">
          {" "}
          R$ {product.price}
        </div>
      </div>
    </div>
  );
}