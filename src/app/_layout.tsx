import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { TemaProvider } from "../components/TemaContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TemaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TemaProvider>
    </QueryClientProvider>
  );
}