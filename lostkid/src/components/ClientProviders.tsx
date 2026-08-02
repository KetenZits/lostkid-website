"use client";
// Wraps the app with all client-side providers (context, etc.)
import { AppProvider } from "@/context/AppContext";
import CartDrawer from "@/components/CartDrawer";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      {children}
      <CartDrawer />
    </AppProvider>
  );
}
