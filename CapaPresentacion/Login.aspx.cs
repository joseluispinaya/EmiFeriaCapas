using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EEstudiante> LoginEst(string Correo, string Clave)
        {
            try
            {
                // 1. Buscamos al usuario por correo
                var resp = NEstudiante.GetInstance().LoginEstudiante(Correo);

                // Si resp.Estado es falso, significa que el correo no existe en BD
                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos." // Mensaje genérico por seguridad
                    };
                }

                var objEst = resp.Data;

                // 2. IMPORTANTE: Primero verificamos la contraseña (BCrypt)
                bool passCorrecta = Utilidadesj.GetInstance().Verify(Clave, objEst.ClaveHash);

                if (!passCorrecta)
                {
                    return new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos."
                    };
                }

                // 3. Si la contraseña es correcta, AHORA verificamos si está activo
                if (!objEst.Estado)
                {
                    return new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Su cuenta se encuentra inactiva. contáctese con Dep. de Sistemas."
                    };
                }

                HttpContext.Current.Session["UsuarioLogueado"] = objEst;
                HttpContext.Current.Session["TipoUsuario"] = "Estudiante"; // Para saber qué menú mostrar
                // 4. Todo correcto, devolvemos el objeto (limpiando el hash por seguridad antes de enviarlo al front)
                objEst.ClaveHash = "";

                return new Respuesta<EEstudiante>
                {
                    Estado = true,
                    Data = objEst,
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EEstudiante>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EDocente> LoginDocente(string Correo, string Clave)
        {
            try
            {
                // 1. Buscamos al usuario por correo
                var resp = NDocente.GetInstance().LoginDocente(Correo);

                // Si resp.Estado es falso, significa que el correo no existe en BD
                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EDocente>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos." // Mensaje genérico por seguridad
                    };
                }

                var objDoce = resp.Data;

                // 2. IMPORTANTE: Primero verificamos la contraseña (BCrypt)
                bool passCorrecta = Utilidadesj.GetInstance().Verify(Clave, objDoce.ClaveHash);

                if (!passCorrecta)
                {
                    return new Respuesta<EDocente>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos."
                    };
                }

                // 3. Si la contraseña es correcta, AHORA verificamos si está activo
                if (!objDoce.Estado)
                {
                    return new Respuesta<EDocente>
                    {
                        Estado = false,
                        Mensaje = "Su cuenta se encuentra inactiva. contáctese con Dep. de Sistemas."
                    };
                }

                HttpContext.Current.Session["UsuarioLogueado"] = objDoce;
                HttpContext.Current.Session["TipoUsuario"] = "Docente"; // Para saber qué menú mostrar
                // 4. Todo correcto, devolvemos el objeto (limpiando el hash por seguridad antes de enviarlo al front)
                objDoce.ClaveHash = "";

                return new Respuesta<EDocente>
                {
                    Estado = true,
                    Data = objDoce,
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EDocente>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EUsuarios> LoginUsuario(string Correo, string Clave)
        {
            try
            {
                var resp = NUsuarios.GetInstance().LoginUsuario(Correo);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EUsuarios>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos." // Mensaje genérico por seguridad
                    };
                }

                var objUser = resp.Data;

                // 2. Validar Contraseña (Simulación directa vs Hash real)
                // NOTA: Cuando pases a producción, aquí usarás: BCrypt.Net.BCrypt.Verify(Clave, objUser.ClaveHash)
                if (Clave != objUser.ClaveHash)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Usuario o Contraseña incorrectos." };
                }

                // 3. Validar Estado
                if (!objUser.Estado)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Su cuenta se encuentra inactiva." };
                }

                HttpContext.Current.Session["UsuarioLogueado"] = objUser;
                HttpContext.Current.Session["TipoUsuario"] = "Admin"; // Para saber qué menú mostrar

                objUser.ClaveHash = "";

                return new Respuesta<EUsuarios>
                {
                    Estado = true,
                    Data = objUser,
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

    }
}