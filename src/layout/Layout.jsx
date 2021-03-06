import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  // Consts
  const location = useLocation();
  const actualUrl = location.pathname;

  // Methods
  const isLinkActive = (pathname) => {
    return actualUrl === pathname ? "text-blue-300" : "text-white";
  };

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          CRM - Clientes
        </h2>

        <nav className="mt-10">
          <Link
            className={`${isLinkActive(
              "/clients"
            )} text-2xl block nmt-2 hover:text-blue-300`}
            to="/clients"
          >
            Clientes
          </Link>
          <Link
            className={`${isLinkActive(
              "/clients/new"
            )} text-2xl block nmt-2 hover:text-blue-300`}
            to="/clients/new"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
