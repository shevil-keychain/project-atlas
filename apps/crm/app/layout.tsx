import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@level/ui/components/ui/toast-container";

export const metadata: Metadata = {
  title: "Keychain CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="overflow-hidden">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
