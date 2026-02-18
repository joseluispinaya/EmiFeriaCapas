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
    public partial class LineasPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ELineaInvest>> ListaLineasInvestigacion()
        {
            return NLineaInvest.GetInstance().ListaLineasInvestigacion();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ELineaInvest objeto)
        {
            return NLineaInvest.GetInstance().RegistrarLineaInvest(objeto);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(ELineaInvest objeto)
        {
            return NLineaInvest.GetInstance().EditarLineaInvest(objeto);
        }

        [WebMethod]
        public static Respuesta<List<ELineaInvest>> ObtenerLineasPorArea(int IdArea)
        {
            return NLineaInvest.GetInstance().ObtenerLineasPorArea(IdArea);
        }
    }
}