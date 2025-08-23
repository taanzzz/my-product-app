import "../globals.css";
import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "@/components/ThemeProvider";


export const metadata = {
  title: "Dashboard - Premium Store",
  description: "Manage your products and store.",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ToastProvider />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}