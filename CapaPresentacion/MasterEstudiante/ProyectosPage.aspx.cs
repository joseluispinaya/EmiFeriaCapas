using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion.MasterEstudiante
{
    public partial class ProyectosPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<ProyectoResumenDTO>> MisProyectos()
        {
            // Obtenemos el ID de la sesión segura que creamos antes
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
                return new Respuesta<List<ProyectoResumenDTO>> { Estado = false, Mensaje = "Sesión expirada" };

            EEstudiante est = (EEstudiante)HttpContext.Current.Session["UsuarioLogueado"];

            return NProyecto.GetInstance().ListarProyectosPorEstudiante(est.IdEstudiante);
        }
    }
}