import {
  useQuery,
  useMutation,
  useQueryClient,
  MutateOptions,
  QueryOptions,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "@/services/api";

export function useApi<T>(resource: string) {
  const queryClient = useQueryClient();

  type Params = Record<string, any>;

  // Faqat foydalanuvchiga ochiq qoldiriladigan opsiyalar:
  type QueryOptions<T> = Omit<
    UseQueryOptions<T, unknown, T, QueryKey>,
    "queryKey" | "queryFn"
  >;

  const get = (params?: Params, options?: QueryOptions<T>) =>
    useQuery<T>({
      queryKey: [resource, params ?? {}],
      queryFn: () => getRequest<T>(`/${resource}`, params),
      ...options,
    });

  const list = (params?: Record<string, any>) =>
    useQuery({
      queryKey: [resource, params],
      queryFn: () => getRequest<T[]>(`/${resource}`, params),
    });

  const post = () =>
    useMutation({
      mutationFn: (data: Partial<T>) => postRequest<T>(`/${resource}`, data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
    });

  const destroy = useMutation({
    mutationFn: (id: number | string) => deleteRequest(`/${resource}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });

  return { get, post, list, destroy };
}

type Variables<T> = { url: string; data: Partial<T> };

export function usePost<T>() {
  const queryClient = useQueryClient();

  const mutation = useMutation<T, unknown, Variables<T>, unknown>({
    mutationFn: ({ url, data }) => postRequest<T>(`/${url}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.url] });
    },
  });

  const mutate = (
    url: string,
    data: Partial<T>,
    options?: MutateOptions<T, unknown, Variables<T>, unknown>
  ) => {
    return mutation.mutate({ url, data }, options);
  };

  return { ...mutation, mutate };
}
