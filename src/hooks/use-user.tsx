import { useApi } from "./use-api";

export default function useUser() {
  return useApi<User>("auth/me").get();
}
