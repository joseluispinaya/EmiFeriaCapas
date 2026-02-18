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
    public partial class AreasPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EAreaInvest>> ListaAreasInvestigacion()
        {
            return NAreaInvest.GetInstance().ListaAreasInvestigacion();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EAreaInvest objeto)
        {
            return NAreaInvest.GetInstance().RegistrarAreasInvest(objeto);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EAreaInvest objeto)
        {
            return NAreaInvest.GetInstance().EditarAreasInvest(objeto);
        }
    }
}