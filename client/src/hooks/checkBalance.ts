import { useState } from "react";
import { AxiosResponse } from "axios";
import { api } from "../services/axios";
import { IHasSufficientBalance } from "../types/hasSufficientBalance";

interface IHasSufficientBalanceReturn {
  status: number;
  hasSufficientBalanceData?: IHasSufficientBalance | null;
  error?: string;
}

export const useHasSufficientBalance = (
  id: number
): {
  hasSufficientBalance: () => Promise<IHasSufficientBalanceReturn>;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(true);

  async function hasSufficientBalance(): Promise<IHasSufficientBalanceReturn> {
    setIsLoading(true);

    try {
      const response = await api.get<IHasSufficientBalance | null>(
        `/user/${id}/check-balance`
      );
      setIsLoading(false);
      return {
        status: 200,
        hasSufficientBalanceData: response.data,
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
    hasSufficientBalance,
    isLoading,
  };
};
