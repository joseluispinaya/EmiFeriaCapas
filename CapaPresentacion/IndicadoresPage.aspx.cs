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
    public partial class IndicadoresPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EIndicador>> ListarIndicadores()
        {
            return NIndicador.GetInstance().ListarIndicadores();
        }

        [WebMethod]
        public static Respuesta<bool> RegistrarOrEditar(EIndicador objeto)
        {
            return NIndicador.GetInstance().RegistrarOrEditar(objeto);
        }

        [WebMethod]
        public static Respuesta<List<EIndicador>> ListarIndicadoresPorCriterio(int IdCriterio)
        {
            return NIndicador.GetInstance().ListarIndicadoresPorCriterio(IdCriterio);
        }
    }
}