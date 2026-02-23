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
    public partial class AsignacionJurados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //[WebMethod(EnableSession = true)]
        [WebMethod]
        public static Respuesta<bool> RegistrarJurados(int IdProyecto, List<EJuradoRequest> ListaGrupoJurados)
        {
            // Validaciones de seguridad básicas
            // if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            // {
            //     return new Respuesta<bool> { Estado = false, Mensaje = "Sesión expirada." };
            // }

            if (IdProyecto <= 0 || ListaGrupoJurados == null || ListaGrupoJurados.Count == 0)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Datos incompletos." };
            }

            // Llamada a la capa de negocio
            // Nota: Asegúrate de tener el método en la clase correcta (NProyecto o donde prefieras)
            return NProyecto.GetInstance().RegistrarJurados(IdProyecto, ListaGrupoJurados);
        }
    }
}