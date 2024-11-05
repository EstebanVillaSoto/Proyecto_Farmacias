import AdminNavbar from "../../../components/AdminNavbar";
//import imagen from "../../../assets/imagen.jpg";
import imagen2 from "../../../assets/pharmacy2.jpg";

export default function AdminHomeScreen() {
  return (
    <div className="flex flex-col w-full h-screen text-white bg-[#16423C]">
      <AdminNavbar /> {/* Navbar */}

      <div className="flex flex-grow justify-center items-center p-20">
        
        <div 
          className="flex flex-col gap-8" 
          style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: '10%' }}
        >
          <h1 className="text-6xl font-bold underline">Tu Farmaceutica</h1>
          <h2 className="text-5xl text-cyan-400 font-semibold underline">
            En Linea
          </h2>
          <p className="text-2xl">
            ¡Únete a Nuestro Programa de Beneficios <br />
            y Cuida de Tu Salud con Descuentos Exclusivos!
          </p>
          <p className="text-2xl">
            ¡Cuidamos de ti y de los tuyos, <br />
            ofreciendo lo mejor para tu salud!
          </p>
        </div>

        
        <div className="w-1/3 bg-gray-200 rounded-lg flex items-center justify-center ml-10">
          <img src={imagen2} alt="Imagen" className="w-full h-full object-contain rounded-lg p-2" />
        </div>


      </div>
    </div>
  );
}
