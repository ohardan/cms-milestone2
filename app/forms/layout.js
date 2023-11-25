import Header from "@/app/components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header formPage={true} />
      {children}
      <footer className=" border-t border-gray-800 p-5 grid place-items-center text-lg">
        <p>Copyright &copy; 2023 CMPS310</p>
      </footer>
    </>
  );
}
