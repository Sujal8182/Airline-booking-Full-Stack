import Sidebar from "./sidebar";

const Adminlayout = ({ children }) => {
  return (
    <div className="flex bg-[#F4F6F8] min-h-screen">
      <Sidebar />

      <main className="ml-64 w-full p-8">
        {children}
      </main>
    </div>
  );
};

export default Adminlayout;
