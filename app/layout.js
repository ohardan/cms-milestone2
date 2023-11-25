import "./globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CMS",
  description: "Conference Management System",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={ubuntu.className}>
      <body className="bg-gray-900 text-slate-200">{children}</body>
    </html>
  );
}
