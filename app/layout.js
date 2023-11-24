import "./globals.css";
import Header from "@/app/components/Header";

export const metadata = {
  title: "CMS",
  description: "Conference Management System",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-slate-200">
        <Header />
        {children}
        <footer className=" border-t border-gray-800 p-5 grid place-items-center text-lg">
          <p>Copyright &copy; 2023 CMPS310</p>
        </footer>
      </body>
    </html>
  );
}
