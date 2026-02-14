import { useState, useEffect, useCallback } from 'react';
import { APIResponse } from '../lib/apiClient';

export type QueryState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
};

export function useQuery<T = any>(
  queryKey: string,
  queryFn: () => Promise<APIResponse<T>>,
  enabled = true
): QueryState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    isLoading: true,
    error: null,
    isSuccess: false
  });

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await queryFn();
      if (result.success) {
        setState({ data: result.data || null, isLoading: false, error: null, isSuccess: true });
      } else {
        setState({ data: null, isLoading: false, error: result.error?.message || 'Erro de API', isSuccess: false });
      }
    } catch (err: any) {
      setState({ data: null, isLoading: false, error: err.message, isSuccess: false });
    }
  }, [queryFn, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData, queryKey]);

  return { ...state, refetch: fetchData };
}

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export function useMutation<T = any, D = any>(
  mutationFn: (data: D) => Promise<APIResponse<T>>,
  options?: MutationOptions<T> | ((data: T) => void)
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: D): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mutationFn(data);
      setIsLoading(false);
      if (result.success && result.data) {
        if (typeof options === 'function') {
          options(result.data);
        } else if (options?.onSuccess) {
          options.onSuccess(result.data);
        }
        return result.data;
      } else {
        const errorMsg = result.error?.message || 'Falha na operação';
        setError(errorMsg);
        if (typeof options === 'object' && options?.onError) {
          options.onError(errorMsg);
        }
        return null;
      }
    } catch (err: any) {
      setIsLoading(false);
      const errorMsg = err.message || 'Erro interno';
      setError(errorMsg);
      if (typeof options === 'object' && options?.onError) {
        options.onError(errorMsg);
      }
      return null;
    }
  };

  return { mutate, isLoading, error };
}