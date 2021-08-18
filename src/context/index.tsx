import * as React from "react";
import { AuthProvider } from "./auth-context";
import { QueryClientProvider, QueryClient, DefaultOptions } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,

    retry(failureCount: number, error: any) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};

const client = new QueryClient({
  defaultOptions: queryConfig,
});

function AppProviders({ children }: any) {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { AppProviders };
