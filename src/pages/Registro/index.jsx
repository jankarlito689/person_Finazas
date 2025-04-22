import {InputCheck} from "../../Components/Inputs/Inputs"
import React from "react";
import { Link } from "react-router-dom";
import "../Registro/registro.css"
import Logo from "../../Components/Logo";


export function Register() {
  //se encarga de los estados de Registro
  const [text, setText] = React.useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    clave: "",
    correo: "",
    validarClave: "",
  });

  // Estado para los errores
  const [errors, setErrors] = React.useState({
    claveNoCoincide: false,
    emailInvalido: false,
    claveInvalida: false,
  });
  //Estado para los mensajes de registro
  const [mensaje, setMensaje] = React.useState('');

  // Expresión regular para validar el formato de correo
  const esEmailValido = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Función para manejar los cambios en los campos
  const handleChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
    setErrors({ claveNoCoincide: false, emailInvalido: false }); // Resetear errores al cambiar
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailInvalido = false;
    let claveNoCoincide = false;

    // Validar el formato del correo
    if (!esEmailValido(text.correo)) {
      emailInvalido = true;
    }

    // Validar que las contraseñas coincidan
    if (text.clave !== text.validarClave) {
      claveNoCoincide = true;
    }

    // Si hay errores, actualizamos el estado de errores y no procedemos
    if (emailInvalido || claveNoCoincide) {
      setErrors({ claveNoCoincide, emailInvalido });
      return;
    }

    try {
      console.log("Iniciando solicitud de registro...");

      // Consumimos la API
      const res = await fetch("https://bankest.somee.com/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: text.correo, // El API requiere 'userName'
          nombre: text.nombre,
          apellidoPaterno: text.apellidoPaterno,
          apellidoMaterno: text.apellidoMaterno,
          password: text.clave,
          telefono: text.telefono,
        }),
      });

      console.log("Solicitud enviada, esperando respuesta...");

      // Obtener el tipo de contenido de la respuesta
      const contentType = res.headers.get("content-type");

      // Manejar respuesta exitosa
      if (res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setMensaje("Registro exitoso", data);

          if (data.token) {
            localStorage.setItem("token", data.token);
          } else {
            console.log("No se recibió token en la respuesta");
          }
        } else {
          const textResponse = await res.text();
          setMensaje("Exito en registro", textResponse);
        }
      } else {
        const errorText = await res.text();
        console.error("Error en el registro:", res.status, errorText);

      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
    }
  };

  return (
    <>
    {/* Sección de barra de navegación */}
    <header className="sticky-top">
  <nav className="navbar glass-nav">
    <div className="container-fluid nav-content">
      <div className="logo-wrapper">
        <Logo width="160px" className="logo-hover"/>
      </div>
      
      <Link to="/" className="back-btn">
        <i className="bi bi-chevron-left"></i>
        <span className="btn-text">Volver al inicio</span>
      </Link>
    </div>
    <div className="nav-accent"></div>
  </nav>
</header>

<main className="container-md my-5">
  <div className="row justify-content-center">
    <div className="col-xl-8 col-lg-10">
      <form 
        className="register-form p-4 p-lg-5" 
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-5">
          <h1 className="titulo-form mb-3">Crea tu Cuenta</h1>
          <p className="text-muted">Comienza a gestionar tus finanzas en pocos pasos</p>
        </div>

        <div className="row g-4">
          {/* Sección de información personal */}
          <div className="col-12">
            <h4 className="subtitulo-form mb-4">Información Personal</h4>
          </div>
          
          <div className="col-md-6">
            <InputCheck
              label="Nombre"
              name="nombre"
              value={text.nombre}
              type="text"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <InputCheck
              label="Apellido Paterno"
              name="apellidoPaterno"
              value={text.apellidoPaterno}
              type="text"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <InputCheck
              label="Apellido Materno"
              name="apellidoMaterno"
              value={text.apellidoMaterno}
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <InputCheck
              label="Teléfono"
              name="telefono"
              value={text.telefono}
              type="tel"
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Sección de información financiera */}
          <div className="col-12 mt-4">
            <h4 className="subtitulo-form mb-4">Información Financiera</h4>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label d-flex align-items-center gap-2">
                <i className="bi bi-cash-stack"></i>
                Frecuencia de Ingresos
              </label>
              <select 
                name="ingresos" 
                className="form-select custom-select"
              >
                <option value="">Seleccione una opción</option>
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label d-flex align-items-center gap-2">
                <i className="bi bi-briefcase"></i>
                  Tipo de empleo
              </label>
              <select 
                name="tipoEmpleo" 
                className="form-select custom-select"
                required
              >
                <option value="">Selecciona tu ocupación</option>
                <option value="empleado">Empleado formal</option>
                <option value="independiente">Trabajador independiente</option>
                <option value="comerciante">Comerciante</option>
                <option value="profesionista">Profesionista independiente</option>
                <option value="estudiante">Estudiante</option>
                <option value="amaCasa">Ama de casa</option>
                <option value="jubilado">Jubilado/Pensionado</option>
                <option value="servicios">Trabajador de servicios</option>
                <option value="eventual">Trabajador eventual</option>
                <option value="otros">Otros</option>
              </select>
            </div>
          </div>
          {/* Sección de credenciales */}
          <div className="col-12 mt-4">
            <h4 className="subtitulo-form mb-4">Credenciales de Acceso</h4>
          </div>

          <div className="col-md-6">
            <InputCheck
              label="Correo Electrónico"
              name="correo"
              value={text.correo}
              type="email"
              onChange={handleChange}
              required
            />
            {errors.emailInvalido && (
              <div className="invalid-feedback d-block">
                * El formato del correo no es válido
              </div>
            )}
          </div>

          <div className="col-md-6">
            <InputCheck
              label="Contraseña"
              name="contraseña"
              value={text.clave}
              type="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <InputCheck
              label="Confirmar Contraseña"
              name="validar contraseña"
              value={text.validarClave}
              type="password"
              onChange={handleChange}
              required
            />
            {errors.claveNoCoincide && (
              <div className="invalid-feedback d-block">
                * Las contraseñas no coinciden
              </div>
            )}
          </div>

          {/* Botón de Registro */}
          <div className="col-12 text-center mt-5">
            <button 
              type="submit" 
              className="btn btn-naranja px-5 py-3 btn-registro"
            >
              <i className="bi bi-person-plus me-2"></i>
              Crear Cuenta Gratis
            </button>
            {mensaje && (
              <div className="alert alert-success mt-3 message" role="alert">
                {mensaje}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  </div>
</main>
    </>
  );
}

