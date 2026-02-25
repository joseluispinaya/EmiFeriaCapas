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
    public partial class AspectosPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EAspecto>> ListaAspectos()
        {
            return NAspecto.GetInstance().ListarAspectos();
        }

        [WebMethod]
        public static Respuesta<bool> GuardarOrEditar(EAspecto objeto)
        {
            return NAspecto.GetInstance().GuardarOrEditarAspectos(objeto);
        }
    }
}