import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { TabNavigation } from "./TabNavigation";
import { Footer } from "./Footer";

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TabNavigation />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1f2937",
            border: "1px solid #374151",
            color: "#f3f4f6",
          },
        }}
      />
    </div>
  );
}
