import React, { useEffect } from "react";
import FinanzasLogin from '../../assets/FinanzasLogin.png'
import Logo from "../../Components/Logo";
import InputField from "../../Components/Inputs/Input-field";
import "./Login.css";
import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = React.useState(false);
  //hook para  manejar la redireccion de User
  const navigate = useNavigate();
  //se encarga de los estados de login
  const [text, setText] = React.useState({
    usuario: "",
    clave: "",
  });
  //se encarga de validad el login
  const handleChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //consumimos la API
      const res = await fetch("https://bankest.somee.com/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: text.usuario, // Mapeamos correctamente "usuario"
          password: text.clave, // Mapeamos correctamente "clave"
        }),
      });

      // Si la respuesta es exitosa
      if (res.ok) {
        const data = await res.json();
        console.log("Login exitoso", data);

        // Guardamos el token si existe
        if (data.token) {
          localStorage.setItem("token", data.token);
          const token = localStorage.getItem("token");
          navigate('/Inicio')

        } else {
          console.log("No se recibió token");
        }
      } else {
        console.error("Error al hacer login", res.status);
        setError(true);
      }
    }
    catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="login-container">
    {/* Navbar consistente */}
    <header className="sticky-top">
        <nav className="navbar glass-nav">
          <div className="container-fluid nav-content">
            <div className="logo-wrapper">
              <Logo width="160px" className="logo-hover"/>
            </div>
            <Link to="/" className="back-btn">
              <i className="bi bi-chevron-left me-2"></i>
              <span className="btn-text">Volver al inicio</span>
            </Link>
          </div>
          <div className="nav-accent"></div>
        </nav>
      </header>
  
    <main className="login-main">
      <div className="row g-0 justify-content-center">
        {/* Formulario Centrado */}
        <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center">
          <div className="login-form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="text-center mb-5">
                <h1 className="titulo-form">Bienvenido a Bankster</h1>
                <p className="text-muted">Ingresa a tu cuenta</p>
              </div>
  
              {/* Campos del formulario */}
              <InputField 
                name="usuario"
                type="text"
                placeholder="Usuario"
                onChange={handleChange}
                icon="bi bi-person"
              />
              
              <InputField 
                name="clave"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                icon="bi bi-lock"
              />
  
              <div className="d-flex justify-content-between my-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember"/>
                  <label className="form-check-label" htmlFor="remember">
                    Recordar usuario
                  </label>
                </div>
                <Link to="/Recuperar" className="link-recuperar">
                  ¿Olvidaste tu clave?
                </Link>
              </div>
  
              <button type="submit" className="btn-login">
                Iniciar Sesión
              </button>
  
              <div className="text-center mt-4">
                <span className="text-secondary">¿No tienes cuenta? </span>
                <Link to="/Register" className="link-registro">
                  Regístrate aquí
                </Link>
              </div>
            </form>
          </div>
        </div>
        {/* Sección Imagen (solo desktop) */}
        <div className="col-md-6 login-banner d-none d-md-block">
            <img 
              src={FinanzasLogin} 
              alt="Ilustración de finanzas" 
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>
      </div>
    </main>
  
    {/* Mensaje de error */}
    {error && (
      <div className="alert alert-danger position-fixed bottom-0 end-0 m-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Los datos ingresados son incorrectos
        <button 
          className="btn-close position-absolute top-0 end-0 m-2"
          onClick={() => setError(false)}
        ></button>
      </div>
    )}
  </div>
  );
}

export default Login;