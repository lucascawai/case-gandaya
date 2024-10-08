import { useState } from "react";
import { AxiosResponse } from "axios";
import { api } from "../services/axios";
import { IProduct } from "../types/product";

interface IProductReturn {
  status: number;
  productsData?: IProduct[] | null;
  error?: string;
}

export const useGetProducts = (): {
  getProducts: () => Promise<IProductReturn>;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts(): Promise<IProductReturn> {
    setIsLoading(true);

    try {
      const response = await api.get<IProduct[] | null>(`/products`);
      setIsLoading(false);
      return {
        status: 200,
        productsData: response.data,
      };
    } catch (err) {
      const error = err as AxiosResponse<string>;
      setIsLoading(false);
      return {
        status: error.status,
        error: error.data,
      };
    }
  }

  return {
    getProducts,
    isLoading,
  };
};
