// import './App.css'
import { createContext, useEffect, useState } from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from "./pages/logins/Login";
import AdminHomeScreen from "./pages/admin/admin-home-screen/AdminHomeScreen";
import ClientHomeScreen from "./pages/client/client-home-screen/ClientHomeScreen";
import ClientRequests from "./pages/client/client-requests/ClientRequests";
import ClientProducts from "./pages/client/client-products/ClientProducts";
import AdminPharmacies from "./pages/admin/admin-pharmacies/AdminPharmacies";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminProducts from "./pages/admin/admin-products/AdminProducts";
import AdminRequests from "./pages/admin/admin-requests/AdminRequests";
import Register from "./pages/logins/Register";
import PasswordRecovery from "./pages/logins/PasswordRecovery";

export const UserContext = createContext<[any, React.Dispatch<React.SetStateAction<any>>] | any>(null);
const router = createBrowserRouter([
  {path: '/', element: <ProtectedRoute adminComponent={<AdminHomeScreen/>} clientComponent={<ClientHomeScreen/>} />},
  {path: '/login', element: <Login/>},
  {path: '/register', element: <Register/>},
  {path: '/requests', element: <ProtectedRoute adminComponent={<AdminRequests/>} clientComponent={<ClientRequests/>} />},
  {path: '/products', element: <ProtectedRoute adminComponent={<AdminProducts/>} clientComponent={<ClientProducts/>} /> },
  {path: '/pharmacies', element: <ProtectedRoute adminComponent={<AdminPharmacies/>} clientComponent={<ClientHomeScreen/>} />},
  {path: '/recover-password', element: <PasswordRecovery/>},
  {path: '*', element: <div className="text-green-1 text-3xl font-bold absolute">404 Not Found</div>}
]);
function App() {
  // Recupera el usuario almacenado en sessionStorage, permite hacer refresh sin perder la sesión del usuario. Se borra cuando se cierra el navegador.
  const initialUser = JSON.parse(sessionStorage.getItem("user") || "null");


  // COMENTAR ESTA LINEA PARA QUE FUNCIONE EL LOGIN, DESCOMENTAR LA DE ABAJO.  
  //  const [user, setUser] = useState<any>({
  //    id: 1,
  //    name: "admin",
  //    email: "admin@gmail.com",
  //    is_admin: true,
  //  });

  // Usuario que se loguea
 const [user, setUser] = useState<any>(initialUser);


  // Actualiza sessionStorage cada vez que el usuario cambie
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}


export default App
