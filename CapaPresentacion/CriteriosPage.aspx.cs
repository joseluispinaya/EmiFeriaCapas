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
    public partial class CriteriosPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECriterio>> ListarCriterios()
        {
            return NCriterio.GetInstance().ListarCriterios();
        }

        [WebMethod]
        public static Respuesta<bool> RegistrarOrEditar(ECriterio objeto)
        {
            return NCriterio.GetInstance().RegistrarOrEditar(objeto);
        }

        [WebMethod]
        public static Respuesta<List<ECriterio>> ListarCriteriosPorAspecto(int IdAspecto)
        {
            return NCriterio.GetInstance().ListarCriteriosPorAspecto(IdAspecto);
        }
    }
}