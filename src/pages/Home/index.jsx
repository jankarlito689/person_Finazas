import './home.css';
import Logo from '../../Components/Logo';
import FinanzasImage from '../../assets/Finanzas.png';
import { useEffect } from 'react';


export default function Home() {
    //se encarga de controlar el scroll de navbar
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        });
      }, []);

    return(
        <>
        <nav className="navbar navbar-expand-lg fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand hover-effect" href="#"><Logo /></a>
    
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto gap-4">
        <li className="nav-item">
          <a className="nav-link hover-effect" href="#">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link hover-effect" href="#">Saber mas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link hover-effect" href="#">Cómo funciona</a>
        </li>
        <li className="nav-item">
          <a className="nav-link hover-effect" href="#">Ayuda</a>
        </li>
      </ul>
      
      <div className="ingresar d-flex gap-3">
        <a className="btn btn-outline-light" href="/login">Iniciar Sesión</a>
        <a className="btn btn-naranja hover-effect" href="/Register">Registrarse</a>
      </div>
    </div>
  </div>
</nav>

<main className='container' style={{ marginTop: '80px' }}>
  {/* Hero Section */}
  <section className='text-center py-5 my-4'>
    <h1 className='titulo'>
      Nuestra plataforma permite gestionar tu dinero con simplicidad y rapidez
    </h1>
    <a className="btn btn-naranja mt-4 hover-effect" href="/Register">
      Comenzar ahora
    </a>
  </section>

  {/* Sección Transformar Finanzas */}
  <section className='row justify-content-center my-5 py-4'>
    <div className="col-lg-6 text-center">
      <h3 className='texto_gradiente'>Transformar las finanzas es fácil</h3>
    </div>
  </section>

  {/* Sección Método Integral */}
  <section className="row my-5 py-4 align-items-center">
    <div className="col-lg-6 mb-4 mb-lg-0">
      <h3 className="texto_gradiente mb-4">Nuestro método integral de gestión financiera</h3>
      <p className="text-muted mb-4">
        Bankster combina simplicidad y control en una sola plataforma.
      </p>
      <button className="btn btn-naranja hover-effect">
        Saber más
      </button>
    </div>
    <div className="col-lg-6">
      <div className="imagen-contenedor">
        <img 
          src={FinanzasImage} 
          alt="Dashboard de Bankster mostrando estadísticas financieras" 
          className="img-fluid"
        />
      </div>
    </div>
  </section>

  {/* Testimonios */}
  <section className="my-5 py-4">
    <h3 className="texto_gradiente text-center mb-5">Lo que dicen nuestros usuarios</h3>
    <div className="avatar-container">
      <img 
        src="https://randomuser.me/api/portraits/women/44.jpg" 
        alt="Usuario 1" 
        className="avatar hover-effect"
      />
      <img 
        src="https://randomuser.me/api/portraits/men/32.jpg" 
        alt="Usuario 2" 
        className="avatar hover-effect"
      />
      <img 
        src="https://randomuser.me/api/portraits/women/68.jpg" 
        alt="Usuario 3" 
        className="avatar hover-effect"
      />
      <img 
        src="https://randomuser.me/api/portraits/men/75.jpg" 
        alt="Usuario 4" 
        className="avatar hover-effect"
      />
    </div>
  </section>
</main>
        </>
    )
}